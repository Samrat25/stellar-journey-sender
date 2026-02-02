/**
 * Transaction History Page
 * 
 * Dedicated page for viewing transaction history with detailed information
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactionHistory } from "@/stellar/stellarClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const History = () => {
  const navigate = useNavigate();
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    const storedKey = localStorage.getItem("stellar_public_key");
    if (storedKey) {
      setPublicKey(storedKey);
      fetchHistory(storedKey);
    } else {
      toast.error("Please connect your wallet first");
      navigate("/connect");
    }
  }, [navigate]);

  const fetchHistory = async (pubKey: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const history = await getTransactionHistory(pubKey, 50);
      setTransactions(history);
    } catch (err: any) {
      console.error("Error fetching history:", err);
      setError(err.message || "Failed to load transaction history");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHash(text);
      toast.success(`${type} copied to clipboard`);
      setTimeout(() => setCopiedHash(null), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  const formatHash = (hash: string) => {
    if (!hash) return "";
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">
                Stellar<span className="text-primary">Pay</span>
              </h1>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => publicKey && fetchHistory(publicKey)}
              disabled={isLoading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Transaction History
          </h1>
          <p className="text-muted-foreground">
            View all your XLM transactions on Stellar Testnet
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 animate-in fade-in duration-300">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading transactions...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-top duration-300">
            <div className="glass-card p-8 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Failed to Load History
              </h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button
                onClick={() => publicKey && fetchHistory(publicKey)}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && transactions.length === 0 && (
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-500">
            <div className="glass-card p-12 text-center">
              <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Transactions Yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Your transaction history will appear here once you make your first payment.
              </p>
              <Button
                onClick={() => navigate("/dashboard")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}

        {/* Transactions List */}
        {!isLoading && !error && transactions.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            {transactions.map((tx, index) => (
              <div
                key={tx.id}
                className="glass-card p-6 animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  {/* Transaction Type */}
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${
                      tx.direction === "sent"
                        ? "bg-destructive/10"
                        : "bg-success/10"
                    }`}>
                      {tx.direction === "sent" ? (
                        <ArrowUpRight className={`h-5 w-5 ${
                          tx.direction === "sent" ? "text-destructive" : "text-success"
                        }`} />
                      ) : (
                        <ArrowDownLeft className="h-5 w-5 text-success" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground capitalize">
                          {tx.direction === "sent" ? "Sent" : "Received"}
                        </h3>
                        <Badge variant={tx.successful ? "default" : "destructive"} className="text-xs">
                          {tx.successful ? "Success" : "Failed"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(tx.timestamp)}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <div className={`text-xl font-bold ${
                      tx.direction === "sent" ? "text-destructive" : "text-success"
                    }`}>
                      {tx.direction === "sent" ? "-" : "+"}{tx.amount} XLM
                    </div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {tx.type}
                    </Badge>
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="space-y-3 pt-4 border-t border-border/50">
                  {/* Other Party */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {tx.direction === "sent" ? "To" : "From"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-foreground">
                        {formatAddress(tx.otherParty)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(tx.otherParty, "Address")}
                      >
                        {copiedHash === tx.otherParty ? (
                          <Check className="h-3 w-3 text-success" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Transaction Hash */}
                  {tx.hash && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Hash</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-foreground">
                          {formatHash(tx.hash)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(tx.hash, "Hash")}
                        >
                          {copiedHash === tx.hash ? (
                            <Check className="h-3 w-3 text-success" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => window.open(
                            `https://stellar.expert/explorer/testnet/tx/${tx.hash}`,
                            "_blank"
                          )}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Memo */}
                  {tx.memo && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Memo</span>
                      <span className="text-sm text-foreground">{tx.memo}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
