/**
 * SendPayment Component
 * 
 * Handles the XLM payment flow:
 * 1. User enters destination address and amount
 * 2. Transaction is built using stellar-sdk
 * 3. Transaction is signed via Freighter
 * 4. Transaction is submitted to Stellar Testnet
 * 5. User sees success/failure feedback with transaction hash
 */

import { useState, useEffect } from "react";
import { signTransaction } from "@stellar/freighter-api";
import {
  buildPaymentTransaction,
  submitTransaction,
  isValidPublicKey,
  getExplorerUrl,
  NETWORK_PASSPHRASE,
} from "@/stellar/stellarClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export default function SendPayment({ publicKey, onTransactionComplete, prefilledDestination }) {
  const [destination, setDestination] = useState(prefilledDestination || "");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [step, setStep] = useState("input"); // input, signing, submitting

  // Update destination when prefilledDestination changes
  useEffect(() => {
    if (prefilledDestination) {
      setDestination(prefilledDestination);
    }
  }, [prefilledDestination]);

  /**
   * Validates the form inputs
   */
  const validateInputs = () => {
    // Check destination format
    if (!destination.trim()) {
      throw new Error("Destination address is required");
    }
    
    if (!isValidPublicKey(destination.trim())) {
      throw new Error("Invalid Stellar address format. Must start with 'G' and be 56 characters.");
    }

    // Check if sending to self
    if (destination.trim() === publicKey) {
      throw new Error("Cannot send to your own address");
    }

    // Check amount
    if (!amount.trim()) {
      throw new Error("Amount is required");
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      throw new Error("Amount must be a positive number");
    }

    // Stellar has a minimum transaction amount
    if (numAmount < 0.0000001) {
      throw new Error("Amount is below minimum (0.0000001 XLM)");
    }

    return true;
  };

  /**
   * Handles the send payment flow
   */
  const handleSendPayment = async () => {
    setError(null);
    setSuccess(null);

    try {
      // Step 1: Validate inputs
      validateInputs();

      setIsLoading(true);
      setStep("signing");

      // Step 2: Build the transaction
      const transactionXDR = await buildPaymentTransaction(
        publicKey,
        destination.trim(),
        amount.trim()
      );

      // Step 3: Sign with Freighter
      // This will open a popup in the Freighter extension
      const signedXDR = await signTransaction(transactionXDR, {
        network: "TESTNET",
        networkPassphrase: NETWORK_PASSPHRASE,
        accountToSign: publicKey,
      });

      // Check if user cancelled the signature
      if (!signedXDR) {
        throw new Error("Transaction signing was cancelled");
      }

      // Step 4: Submit to Stellar network
      setStep("submitting");
      const result = await submitTransaction(signedXDR);

      // Step 5: Success!
      setSuccess({
        hash: result.hash,
        explorerUrl: getExplorerUrl(result.hash),
      });

      toast.success("Payment sent successfully!", {
        description: `Sent ${amount} XLM`,
      });

      // Clear form
      setDestination("");
      setAmount("");

      // Notify parent to refresh balance
      if (onTransactionComplete) {
        onTransactionComplete();
      }
    } catch (err) {
      console.error("Payment error:", err);
      const errorMsg = err.message || "Transaction failed. Please try again.";
      setError(errorMsg);
      toast.error("Transaction failed", {
        description: errorMsg,
      });
    } finally {
      setIsLoading(false);
      setStep("input");
    }
  };

  /**
   * Gets the current step label for loading state
   */
  const getStepLabel = () => {
    switch (step) {
      case "signing":
        return "Waiting for signature...";
      case "submitting":
        return "Submitting transaction...";
      default:
        return "Processing...";
    }
  };

  // Wallet not connected
  if (!publicKey) {
    return (
      <div className="glass-card p-6 opacity-60">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-muted">
            <Send className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">Send Payment</h3>
            <p className="text-xs text-muted-foreground">Not connected</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
          <Send className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Send Payment</h3>
          <Badge variant="outline" className="mt-1 text-xs">
            Testnet
          </Badge>
        </div>
      </div>

      {/* Success message */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/20 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-success/20">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div className="space-y-2 flex-1">
              <p className="text-success font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Payment Sent!
              </p>
              <p className="text-xs text-muted-foreground font-mono break-all leading-relaxed">
                {success.hash}
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="gap-2 border-success/30 text-success hover:bg-success/10 hover:border-success/50"
              >
                <a
                  href={success.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Explorer
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 border-2 border-destructive/20 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-destructive font-semibold">Transaction Failed</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPayment();
        }}
        className="space-y-4"
      >
        {/* Destination input */}
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-sm font-medium text-foreground">
            Destination Address
          </Label>
          <Input
            id="destination"
            type="text"
            placeholder="GABC...XYZ (Stellar public key)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            disabled={isLoading}
            className="font-mono text-sm bg-muted/30 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50 transition-all"
          />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enter the recipient's Stellar public key (starts with 'G')
          </p>
        </div>

        {/* Amount input */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium text-foreground">
            Amount
          </Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              step="0.0000001"
              min="0.0000001"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
              className="pr-16 text-lg bg-muted/30 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50 transition-all"
            />
            <Badge className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary/10 text-primary border-primary/20">
              XLM
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Minimum: 0.0000001 XLM
          </p>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isLoading || !destination || !amount}
          className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 mt-6"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {getStepLabel()}
            </>
          ) : (
            <>
              Send Payment
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      {/* Testnet reminder */}
      <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-muted/30 border border-border/50">
        <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          This is Stellar Testnet. Transactions use test XLM only.
        </p>
      </div>
    </div>
  );
}
