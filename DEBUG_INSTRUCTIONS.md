# Debug Instructions

## Current Issue
Wallet not connecting even though Freighter is on Testnet.

## What I've Added

### 1. Debug Logging
Added extensive console.log statements throughout WalletConnect.jsx to track:
- Freighter status check
- Connection attempts
- Network verification
- API responses

### 2. Debug Panel
Added a temporary FreighterDebug component that will appear at the top of your page.

## How to Debug

### Step 1: Start the Dev Server
```bash
npm run dev
```

### Step 2: Open the App
1. Open your browser
2. Navigate to http://localhost:5173 (or whatever port Vite shows)
3. Open browser console (F12 → Console tab)

### Step 3: Run Debug Tests
1. You'll see a yellow "Freighter Debug Panel" at the top
2. Click "Run All Tests" button
3. Watch the console for detailed logs
4. Check the results in the debug panel

### Step 4: Try Manual Connection
1. Scroll down to the WalletConnect card
2. Click "Connect Freighter"
3. Watch the console for logs
4. Check what happens in Freighter popup

## What to Look For

### In the Console:
```
✅ Good signs:
- "Checking Freighter status..."
- "Freighter is connected"
- "isConnected result: { isConnected: true }"
- "isAllowed result: { isAllowed: true }"
- "Got address: GABC..."
- "Network check result: { network: 'TESTNET', ... }"

❌ Bad signs:
- Any errors in red
- "isConnected: false"
- "address: ''" (empty string)
- "network: 'PUBLIC'" or other network
```

### In the Debug Panel:
Check each test result:

1. **isConnected**
   - Should show: `{ isConnected: true }`
   - If false: Freighter not installed or not working

2. **isAllowed**
   - Should show: `{ isAllowed: true }` (after first connection)
   - If false: Need to connect first

3. **getAddress**
   - Should show: `{ address: "GABC..." }`
   - If empty: Not connected or not allowed

4. **getNetwork**
   - Should show: `{ network: "TESTNET", networkPassphrase: "..." }`
   - If "PUBLIC": Wrong network!

5. **requestAccess**
   - Should prompt Freighter popup
   - Should return: `{ address: "GABC..." }`
   - If error: Check error message

## Common Issues & Solutions

### Issue 1: isConnected returns false
**Solution:**
- Check if Freighter is actually installed
- Try disabling and re-enabling the extension
- Restart browser

### Issue 2: getAddress returns empty string
**Solution:**
- Click "Connect Freighter" button
- Approve the connection in Freighter popup
- Run tests again

### Issue 3: Network shows "PUBLIC" instead of "TESTNET"
**Solution:**
1. Open Freighter extension
2. Click settings (gear icon)
3. Click "Network"
4. Select "Testnet"
5. Refresh the page

### Issue 4: requestAccess shows error
**Possible errors:**
- "User declined access" - You clicked reject
- "Extension locked" - Unlock Freighter
- Other errors - Share in console

## Share These Results

After running the tests, please share:

1. **Console logs** (copy/paste or screenshot)
2. **Debug panel results** (screenshot)
3. **Any error messages**
4. **Freighter version** (from extension settings)
5. **Browser and version**

## Example of What to Share

```
Console Output:
--------------
Checking Freighter status...
isConnected result: { isConnected: true }
Freighter is connected, checking if allowed...
isAllowed result: { isAllowed: false }

Debug Panel Results:
-------------------
✅ isConnected: { isConnected: true }
✅ isAllowed: { isAllowed: false }
✅ getAddress: { address: "" }
✅ getNetwork: { network: "TESTNET", networkPassphrase: "Test SDF Network ; September 2015" }
❌ requestAccess: User declined access
```

## Next Steps

Based on the debug output, I can:
1. Identify the exact issue
2. Provide a targeted fix
3. Update the code accordingly

## Removing Debug Code

Once we fix the issue, we'll remove:
1. The FreighterDebug component
2. The debug panel from Index.tsx
3. The console.log statements (or reduce them)

## Quick Test Checklist

- [ ] Freighter installed and visible in extensions
- [ ] Freighter unlocked (not asking for password)
- [ ] Network set to Testnet in Freighter
- [ ] Browser console open (F12)
- [ ] Debug panel visible on page
- [ ] "Run All Tests" clicked
- [ ] Results captured
- [ ] "Connect Freighter" clicked
- [ ] Console logs captured

## Need Help?

If you're stuck, share:
1. Screenshot of debug panel
2. Console logs (copy/paste)
3. Screenshot of Freighter settings showing network
4. Any error messages you see

I'll analyze the output and provide a fix!
