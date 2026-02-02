/**
 * WalletConnect Component
 * 
 * Handles Freighter wallet connection/disconnection
 * Displays the connected wallet's public key
 * 
 * Freighter is a browser extension wallet for Stellar
 * Similar to MetaMask for Ethereum
 */

import { useState, useEffect, useCallback } from "react";
import {
  isConnected,
  isAllowed,
  setAllowed,
  requestAccess,
  getAddress,
  getNetwork,
} from "@stellar/freighter-api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, LogOut, AlertCircle, ExternalLink, CheckCircle, Copy, Check, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function WalletConnect({ onConnect, onDisconnect, publicKey }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [freighterInstalled, setFreighterInstalled] = useState(null);
  const [networkCorrect, setNetworkCorrect] = useState(true);
  const [copied, setCopied] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState(null);

  // Check if Freighter is installed on component mount
  useEffect(() => {
    checkFreighterStatus();
  }, []);

  /**
   * Checks if Freighter extension is installed and accessible
   */
  const checkFreighterStatus = async () => {
    try {
      console.log("Checking Freighter status..."); // Debug
      const connectedResult = await isConnected();
      console.log("isConnected result:", connectedResult); // Debug
      
      const connected = connectedResult.isConnected || connectedResult;
      setFreighterInstalled(connected);
      
      if (connected) {
        console.log("Freighter is connected, checking if allowed..."); // Debug
        // Check if already allowed and try to get address
        const allowedResult = await isAllowed();
        console.log("isAllowed result:", allowedResult); // Debug
        
        const allowed = allowedResult.isAllowed || allowedResult;
        
        if (allowed) {
          console.log("App is allowed, getting address..."); // Debug
          // Try to get address without prompting
          const addressObj = await getAddress();
          console.log("getAddress result:", addressObj); // Debug
          
          if (addressObj.address) {
            console.log("Got address, checking network..."); // Debug
            // Auto-connect silently
            const networkResult = await getNetwork();
            console.log("Network check result:", networkResult); // Debug
            
            const networkName = networkResult.network || networkResult;
            const isTestnet = networkName === "TESTNET";
            
            if (isTestnet) {
              console.log("Network is correct, auto-connecting..."); // Debug
              setCurrentNetwork(networkName);
              setNetworkCorrect(true);
              onConnect(addressObj.address);
            } else {
              console.warn("Wrong network:", networkName); // Debug
              setCurrentNetwork(networkName);
              setNetworkCorrect(false);
            }
          }
        }
      }
    } catch (err) {
      console.error("Error checking Freighter status:", err);
      setFreighterInstalled(false);
    }
  };

  /**
   * Verifies the wallet is connected to Stellar Testnet
   */
  const checkNetwork = async () => {
    try {
      const networkResult = await getNetwork();
      console.log("Network result:", networkResult); // Debug log
      
      // getNetwork() returns an object like { network: "TESTNET", networkPassphrase: "..." }
      const networkName = networkResult.network || networkResult;
      setCurrentNetwork(networkName);
      
      // Freighter returns "TESTNET" for testnet
      const isTestnet = networkName === "TESTNET";
      setNetworkCorrect(isTestnet);
      
      if (!isTestnet) {
        console.warn("Wrong network detected:", networkName);
      }
      
      return isTestnet;
    } catch (err) {
      console.error("Error checking network:", err);
      setCurrentNetwork(null);
      return false;
    }
  };

  /**
   * Connects to Freighter wallet
   * @param {boolean} silent - If true, don't show errors (for auto-connect)
   */
  const connectWallet = useCallback(async (silent = false) => {
    console.log("connectWallet called, silent:", silent); // Debug
    setIsLoading(true);
    setError(null);

    try {
      console.log("Requesting access from Freighter..."); // Debug
      // Request access from user (this will prompt if not already allowed)
      const accessObj = await requestAccess();
      console.log("requestAccess result:", accessObj); // Debug
      
      if (accessObj.error) {
        throw new Error(accessObj.error);
      }
      
      const pubKey = accessObj.address;
      console.log("Got public key:", pubKey); // Debug
      
      if (!pubKey) {
        throw new Error("Could not retrieve public key from Freighter");
      }

      // Verify we're on testnet
      console.log("Checking network..."); // Debug
      const networkResult = await getNetwork();
      console.log("Network result:", networkResult); // Debug
      
      const networkName = networkResult.network || networkResult;
      setCurrentNetwork(networkName);
      
      const isTestnet = networkName === "TESTNET";
      setNetworkCorrect(isTestnet);
      
      if (!isTestnet) {
        const errorMsg = `Please switch to Stellar Testnet in Freighter settings (currently on ${networkName})`;
        console.warn(errorMsg); // Debug
        setError(errorMsg);
        if (!silent) {
          toast.error(errorMsg);
        }
        setIsLoading(false);
        return;
      }

      // Notify parent component of successful connection
      console.log("Connection successful, notifying parent..."); // Debug
      onConnect(pubKey);
      if (!silent) {
        toast.success("Wallet connected successfully!");
      }
    } catch (err) {
      console.error("Wallet connection error:", err);
      const errorMsg = err.message || "Failed to connect wallet";
      if (!silent) {
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  }, [onConnect]);

  /**
   * Disconnects the wallet (client-side only)
   * Note: Freighter doesn't have a true "disconnect" - we just clear our state
   */
  const disconnectWallet = () => {
    onDisconnect();
    setError(null);
    setCurrentNetwork(null);
    toast.info("Wallet disconnected");
  };

  /**
   * Copies the public key to clipboard
   */
  const copyAddress = async () => {
    if (!publicKey) return;
    
    try {
      await navigator.clipboard.writeText(publicKey);
      setCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  // Freighter not installed - show installation prompt
  if (freighterInstalled === false) {
    return (
      <div className="glass-card p-6 border-2 border-warning/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-warning/20 to-warning/5">
            <AlertCircle className="h-6 w-6 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Freighter Required</h3>
            <Badge variant="outline" className="mt-1 text-xs">Browser Extension</Badge>
          </div>
        </div>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          Freighter is a secure wallet extension for Stellar. Install it to connect your wallet and start making transactions.
        </p>
        <Button
          asChild
          className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
        >
          <a
            href="https://www.freighter.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Install Freighter
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <button
          onClick={checkFreighterStatus}
          className="w-full mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Refresh after installation
        </button>
      </div>
    );
  }

  // Still checking Freighter status
  if (freighterInstalled === null) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
          <span className="text-muted-foreground">Checking wallet status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card p-6 transition-all duration-300 ${publicKey ? 'border-2 border-success/30' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br transition-all duration-300 ${
            publicKey 
              ? 'from-success/20 to-success/5' 
              : 'from-primary/20 to-primary/5'
          }`}>
            <Wallet className={`h-6 w-6 transition-colors ${
              publicKey ? 'text-success' : 'text-primary'
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {publicKey ? "Connected" : "Wallet"}
            </h3>
            {publicKey && currentNetwork && (
              <Badge variant="outline" className="mt-1 text-xs">
                {currentNetwork}
              </Badge>
            )}
          </div>
        </div>
        {publicKey && (
          <CheckCircle className="h-5 w-5 text-success animate-in fade-in zoom-in duration-300" />
        )}
      </div>

      {/* Network warning */}
      {!networkCorrect && publicKey && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4 animate-in slide-in-from-top duration-300">
          <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">Wrong Network</p>
            <p className="text-xs text-destructive/80 mt-1">
              Please switch to Stellar Testnet in Freighter settings
            </p>
          </div>
        </div>
      )}

      {/* Error display */}
      {error && !publicKey && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4 animate-in slide-in-from-top duration-300">
          <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        </div>
      )}

      {/* Connected state */}
      {publicKey ? (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom duration-500">
          {/* Address display */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/20 border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Your Address
              </span>
              <Button
                onClick={copyAddress}
                variant="ghost"
                size="sm"
                className="h-6 px-2 gap-1 hover:bg-background/50"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-success" />
                    <span className="text-xs text-success">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </Button>
            </div>
            <p className="font-mono text-sm text-foreground break-all leading-relaxed">
              {publicKey}
            </p>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2">
            <Button
              onClick={disconnectWallet}
              variant="outline"
              className="flex-1 gap-2 border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </Button>
            <Button
              onClick={() => window.open(`https://stellar.expert/explorer/testnet/account/${publicKey}`, '_blank')}
              variant="outline"
              className="gap-2 border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
            >
              <ExternalLink className="h-4 w-4" />
              Explorer
            </Button>
          </div>
        </div>
      ) : (
        /* Disconnected state */
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect your Freighter wallet to view balance and send XLM on Testnet.
            </p>
          </div>
          
          <Button
            onClick={() => connectWallet(false)}
            disabled={isLoading}
            className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="h-5 w-5" />
                Connect Freighter
              </>
            )}
          </Button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>Secure & Non-Custodial</span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>
      )}
    </div>
  );
}
