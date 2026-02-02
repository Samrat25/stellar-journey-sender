/**
 * Balance Component
 * 
 * Displays the XLM balance for the connected wallet
 * Fetches balance from Stellar Horizon testnet API
 * Includes loading and error states
 */

import { useState, useEffect, useCallback } from "react";
import { getBalance } from "@/stellar/stellarClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Coins, AlertCircle, ExternalLink, TrendingUp, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Balance({ publicKey }) {
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Fetches the current XLM balance
   */
  const fetchBalance = useCallback(async () => {
    if (!publicKey) return;

    setIsLoading(true);
    setError(null);

    try {
      const xlmBalance = await getBalance(publicKey);
      setBalance(xlmBalance);
      setLastUpdated(new Date());
      toast.success("Balance updated");
    } catch (err) {
      console.error("Error fetching balance:", err);
      const errorMsg = err.message || "Failed to fetch balance";
      setError(errorMsg);
      setBalance(null);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [publicKey]);

  // Fetch balance when public key changes
  useEffect(() => {
    if (publicKey) {
      fetchBalance();
    } else {
      setBalance(null);
      setError(null);
    }
  }, [publicKey, fetchBalance]);

  /**
   * Formats balance for display
   * Shows up to 7 decimal places (Stellar precision)
   */
  const formatBalance = (bal) => {
    if (!bal) return "0";
    const num = parseFloat(bal);
    // Format with commas and limit decimal places
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 7,
    });
  };

  /**
   * Opens Stellar Laboratory to fund testnet account
   * Friendbot gives 10,000 XLM for testing
   */
  const openFriendbot = () => {
    window.open(
      `https://laboratory.stellar.org/#account-creator?network=test`,
      "_blank"
    );
  };

  // Wallet not connected
  if (!publicKey) {
    return (
      <div className="glass-card p-6 opacity-60">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-muted">
            <Coins className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">Balance</h3>
            <p className="text-xs text-muted-foreground">Not connected</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
            <Coins className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Balance</h3>
            {lastUpdated && !isLoading && (
              <p className="text-xs text-muted-foreground">
                {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchBalance}
          disabled={isLoading}
          className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
          title="Refresh balance"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Error state */}
      {error && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">{error}</p>
              {error.includes("not found") && (
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  New accounts need to be funded with at least 1 XLM to be activated on the Stellar network.
                </p>
              )}
            </div>
          </div>
          {error.includes("not found") && (
            <Button
              onClick={openFriendbot}
              className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              <TrendingUp className="h-4 w-4" />
              Fund with Friendbot (10,000 XLM)
            </Button>
          )}
        </div>
      )}

      {/* Loading state */}
      {isLoading && !error && (
        <div className="flex flex-col items-center justify-center py-8 animate-in fade-in duration-300">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-3" />
          <span className="text-sm text-muted-foreground">Loading balance...</span>
        </div>
      )}

      {/* Balance display */}
      {balance !== null && !isLoading && !error && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
          {/* Main balance */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-foreground tracking-tight">
                {formatBalance(balance)}
              </span>
              <span className="text-xl text-muted-foreground font-medium">XLM</span>
            </div>
            <Badge variant="outline" className="mt-2 text-xs">
              Stellar Testnet
            </Badge>
          </div>
          
          {/* Low balance warning */}
          {parseFloat(balance) < 1 && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20 animate-in slide-in-from-top duration-300">
              <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
              <p className="text-xs text-warning leading-relaxed">
                Low balance. Minimum 1 XLM required for most transactions.
              </p>
            </div>
          )}

          {/* Friendbot link for getting test XLM */}
          <Button
            variant="ghost"
            size="sm"
            onClick={openFriendbot}
            className="w-full text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 gap-2 transition-all"
          >
            <TrendingUp className="h-3 w-3" />
            Need more test XLM? Use Friendbot
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
