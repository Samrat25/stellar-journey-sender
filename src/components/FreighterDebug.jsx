/**
 * FreighterDebug Component
 * 
 * Temporary debug component to diagnose Freighter connection issues
 * Remove this after debugging is complete
 */

import { useState } from "react";
import {
  isConnected,
  isAllowed,
  requestAccess,
  getAddress,
  getNetwork,
} from "@stellar/freighter-api";
import { Button } from "@/components/ui/button";

export default function FreighterDebug() {
  const [results, setResults] = useState({});

  const runTest = async (testName, testFn) => {
    try {
      console.log(`Running test: ${testName}`);
      const result = await testFn();
      console.log(`${testName} result:`, result);
      setResults(prev => ({ ...prev, [testName]: { success: true, data: result } }));
    } catch (err) {
      console.error(`${testName} error:`, err);
      setResults(prev => ({ ...prev, [testName]: { success: false, error: err.message } }));
    }
  };

  const runAllTests = async () => {
    setResults({});
    
    await runTest("isConnected", async () => {
      const result = await isConnected();
      return result;
    });

    await runTest("isAllowed", async () => {
      const result = await isAllowed();
      return result;
    });

    await runTest("getAddress", async () => {
      const result = await getAddress();
      return result;
    });

    await runTest("getNetwork", async () => {
      const result = await getNetwork();
      return result;
    });

    await runTest("requestAccess", async () => {
      const result = await requestAccess();
      return result;
    });
  };

  return (
    <div className="glass-card p-6 mb-6 border-2 border-warning/50">
      <h3 className="text-lg font-bold text-warning mb-4">🔧 Freighter Debug Panel</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This panel helps diagnose Freighter connection issues. Check the browser console for detailed logs.
      </p>
      
      <Button onClick={runAllTests} className="mb-4">
        Run All Tests
      </Button>

      <div className="space-y-2 font-mono text-xs">
        {Object.entries(results).map(([test, result]) => (
          <div key={test} className="p-2 rounded bg-muted/50">
            <div className="font-bold mb-1">
              {result.success ? "✅" : "❌"} {test}
            </div>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(result.success ? result.data : result.error, null, 2)}
            </pre>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded bg-muted/30 text-xs">
        <p className="font-bold mb-2">Quick Checks:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Is Freighter installed? (Check browser extensions)</li>
          <li>Is Freighter unlocked? (Click the extension icon)</li>
          <li>Is network set to Testnet? (Freighter settings)</li>
          <li>Check browser console (F12) for errors</li>
        </ul>
      </div>
    </div>
  );
}
