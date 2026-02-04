/**
 * Dashboard Page
 * 
 * Main dashboard showing balance and send payment functionality
 */

import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Balance from "@/components/Balance";
import SendPayment from "@/components/SendPayment";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  LogOut, 
  History,
  Wallet,
  Menu,
  X
} from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Get public key from navigation state or localStorage
    const stateKey = location.state?.publicKey;
    const storedKey = localStorage.getItem("stellar_public_key");
    
    if (stateKey) {
      setPublicKey(stateKey);
      localStorage.setItem("stellar_public_key", stateKey);
    } else if (storedKey) {
      setPublicKey(storedKey);
    } else {
      // No wallet connected, redirect to connect page
      toast.error("Please connect your wallet first");
      navigate("/connect");
    }
  }, [location, navigate]);

  const handleTransactionComplete = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleDisconnect = () => {
    localStorage.removeItem("stellar_public_key");
    setPublicKey(null);
    toast.info("Wallet disconnected");
    navigate("/");
  };

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!publicKey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">
                Stellar<span className="text-primary">Pay</span>
              </h1>
              <Badge variant="outline" className="ml-2 text-xs hidden sm:inline-flex">
                TESTNET
              </Badge>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono text-foreground">
                  {formatAddress(publicKey)}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/history")}
                className="gap-2"
              >
                <History className="h-4 w-4" />
                History
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleDisconnect}
                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                Disconnect
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-border/50 space-y-2 animate-in slide-in-from-top duration-200">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono text-foreground">
                  {formatAddress(publicKey)}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigate("/history");
                  setMobileMenuOpen(false);
                }}
                className="w-full gap-2 justify-start"
              >
                <History className="h-4 w-4" />
                Transaction History
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleDisconnect}
                className="w-full gap-2 justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                Disconnect Wallet
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your XLM balance and send payments
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Balance Card */}
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <Balance key={`balance-${refreshKey}`} publicKey={publicKey} />
          </div>

          {/* Send Payment Card */}
          <div className="animate-in fade-in slide-in-from-right duration-700">
            <SendPayment
              publicKey={publicKey}
              onTransactionComplete={handleTransactionComplete}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/history")}
                className="gap-2 justify-start"
              >
                <History className="h-4 w-4" />
                View Transaction History
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.open(`https://stellar.expert/explorer/testnet/account/${publicKey}`, "_blank")}
                className="gap-2 justify-start"
              >
                <Sparkles className="h-4 w-4" />
                View on Explorer
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
