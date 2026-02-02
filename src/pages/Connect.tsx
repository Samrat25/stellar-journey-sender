/**
 * Connect Wallet Page
 * 
 * Dedicated page for wallet connection
 */

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import WalletConnect from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

const Connect = () => {
  const navigate = useNavigate();
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const handleConnect = useCallback((pubKey: string) => {
    setPublicKey(pubKey);
    // Navigate to dashboard after successful connection
    setTimeout(() => {
      navigate("/dashboard", { state: { publicKey: pubKey } });
    }, 1000);
  }, [navigate]);

  const handleDisconnect = useCallback(() => {
    setPublicKey(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">
              Stellar<span className="text-primary">Pay</span>
            </h1>
          </div>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-500">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Connect Your Wallet
            </h1>
            <p className="text-muted-foreground">
              Connect your Freighter wallet to access your dashboard
            </p>
          </div>

          {/* Wallet Connect Card */}
          <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <WalletConnect
              publicKey={publicKey}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
          </div>

          {/* Info Cards */}
          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <div className="glass-card p-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm">
                Don't have Freighter?
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Freighter is a secure browser extension wallet for Stellar.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://www.freighter.app/", "_blank")}
                className="w-full"
              >
                Install Freighter
              </Button>
            </div>

            <div className="glass-card p-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm">
                Need Test XLM?
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Get free test XLM from Friendbot to start testing.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://laboratory.stellar.org/#account-creator?network=test", "_blank")}
                className="w-full"
              >
                Get Test XLM
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Connect;
