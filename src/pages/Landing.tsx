/**
 * Landing Page
 * 
 * Beautiful hero section with call-to-action to connect wallet
 */

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Wallet, 
  Zap, 
  Shield, 
  TrendingUp, 
  ArrowRight,
  Github,
  BookOpen,
  CheckCircle
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Transactions settle in 3-5 seconds on the Stellar network"
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Non-custodial wallet integration with Freighter"
    },
    {
      icon: TrendingUp,
      title: "Low Fees",
      description: "Minimal transaction fees (~0.00001 XLM per transaction)"
    }
  ];

  const steps = [
    "Connect your Freighter wallet",
    "View your XLM balance",
    "Send payments instantly",
    "Track transaction history"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">
              Stellar<span className="text-primary">Pay</span>
            </h1>
            <Badge variant="outline" className="ml-2 text-xs">
              TESTNET
            </Badge>
          </div>
          
          <nav className="flex items-center gap-4">
            <a
              href="https://developers.stellar.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Docs</span>
            </a>
            <a
              href="https://github.com/stellar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-in fade-in slide-in-from-top duration-500">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Stellar Network</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-in fade-in slide-in-from-bottom duration-700">
              Send XLM Payments
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Fast & Secure
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-100">
              Experience the future of payments with Stellar. Connect your Freighter wallet 
              and start sending XLM on the testnet in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom duration-700 delay-200">
              <Button
                onClick={() => navigate("/connect")}
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 text-lg px-8"
              >
                <Wallet className="h-5 w-5" />
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
              
              <Button
                onClick={() => window.open("https://developers.stellar.org/", "_blank")}
                variant="outline"
                size="lg"
                className="gap-2 text-lg px-8"
              >
                <BookOpen className="h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-6 text-center animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              How It Works
            </h2>
            
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-foreground font-medium">{step}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-1" />
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border/50 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Ready to get started?
              </p>
              <Button
                onClick={() => navigate("/connect")}
                className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Transaction Speed", value: "3-5s" },
              { label: "Network Fee", value: "~0.00001 XLM" },
              { label: "Uptime", value: "99.9%" },
              { label: "Networks", value: "Testnet" }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-in fade-in zoom-in duration-500"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/20">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Built for the{" "}
            <span className="text-primary font-medium">
              Stellar Journey to Mastery
            </span>
          </p>
          <p className="mt-2 text-xs">
            Powered by{" "}
            <a
              href="https://stellar.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Stellar
            </a>{" "}
            &{" "}
            <a
              href="https://freighter.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Freighter
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
