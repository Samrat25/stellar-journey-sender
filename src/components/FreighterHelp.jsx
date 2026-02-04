/**
 * FreighterHelp Component
 * 
 * Shows helpful tips for Freighter connection issues
 */

import { AlertCircle, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FreighterHelp() {
  return (
    <div className="glass-card p-6 border-2 border-warning/30">
      <div className="flex items-start gap-3 mb-4">
        <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">
            Transaction Not Working?
          </h3>
          <p className="text-sm text-muted-foreground">
            If Freighter says "not connected", follow these steps:
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            Open Freighter → Settings → Manage Connected Sites
          </p>
        </div>
        
        <div className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            Remove localhost from the list (if present)
          </p>
        </div>
        
        <div className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            Disconnect and reconnect your wallet in this app
          </p>
        </div>
        
        <div className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            Try sending the transaction again
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open("https://docs.freighter.app/", "_blank")}
        className="w-full gap-2 text-xs"
      >
        <ExternalLink className="h-3 w-3" />
        View Freighter Documentation
      </Button>
    </div>
  );
}
