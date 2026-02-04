# Freighter "Not Connected" Error Fix

## The Problem

When trying to send a transaction, Freighter shows an error saying "localhost is not connected with the wallet" even though you successfully connected earlier.

## Why This Happens

Freighter has two levels of permission:
1. **Initial Connection** - Allows the app to see your public key
2. **Transaction Signing** - Allows the app to request transaction signatures

Sometimes the second permission gets revoked or wasn't properly granted.

## Solution 1: Reconnect in Freighter Settings (Recommended)

### Step 1: Open Freighter Extension
- Click the Freighter icon in your browser toolbar
- Or press `Alt+X` (Windows/Linux) or `Option+X` (Mac)

### Step 2: Go to Settings
- Click the gear icon (⚙️) in the top right
- Select "Settings"

### Step 3: Manage Connections
- Scroll down to "Manage Connected Sites" or "Allowed Sites"
- Look for `localhost:5173` (or your dev server port)

### Step 4: Remove and Re-add
- If localhost is listed, click "Remove" or the trash icon
- Close Freighter
- Go back to your app
- Click "Disconnect" in the app
- Click "Connect Freighter" again
- Approve the connection

### Step 5: Try Transaction Again
- Fill in the payment form
- Click "Send Payment"
- Approve in Freighter popup

---

## Solution 2: Clear Freighter Cache

### Step 1: Open Freighter
- Click the Freighter extension icon

### Step 2: Lock Wallet
- Click the lock icon or "Lock" button
- This will lock your wallet

### Step 3: Unlock Wallet
- Enter your password
- Unlock the wallet

### Step 4: Reconnect App
- Go back to your app
- Disconnect wallet
- Connect again
- Try sending transaction

---

## Solution 3: Use the Updated Code

The code has been updated to automatically request permission before each transaction. This should fix the issue.

### What Changed:

**Before:**
```javascript
// Just tried to sign directly
const signedXDR = await signTransaction(transactionXDR, {...});
```

**After:**
```javascript
// Check if still allowed
const allowed = await isAllowed();
if (!allowed) {
  // Request access again
  await requestAccess();
}

// Then sign
const signedXDR = await signTransaction(transactionXDR, {...});
```

### To Get the Fix:
1. The code is already updated in `src/components/SendPayment.jsx`
2. Restart your dev server: `npm run dev`
3. Refresh your browser
4. Try sending a transaction

---

## Solution 4: Check Freighter Permissions

### Step 1: Open Freighter
- Click the extension icon

### Step 2: Check Active Account
- Make sure the correct account is selected
- The account should match the one shown in your app

### Step 3: Check Network
- Make sure you're on "Testnet"
- Not "Public" or "Futurenet"

### Step 4: Check Permissions
- Go to Settings → Manage Connected Sites
- Make sure localhost has these permissions:
  - ✅ View public key
  - ✅ Sign transactions

---

## Solution 5: Browser-Specific Fixes

### Chrome/Edge
1. Go to `chrome://extensions/`
2. Find Freighter
3. Click "Details"
4. Scroll to "Site access"
5. Make sure it's set to "On all sites" or "On specific sites" (including localhost)

### Firefox
1. Go to `about:addons`
2. Find Freighter
3. Click "Permissions"
4. Make sure "Access your data for all websites" is enabled

### Brave
1. Brave might block Freighter by default
2. Click the Brave shield icon in address bar
3. Turn off "Shields" for localhost
4. Refresh the page

---

## Solution 6: Manual Permission Grant

If automatic permission doesn't work, you can manually grant it:

### Step 1: Open Browser Console
- Press F12
- Go to Console tab

### Step 2: Run This Command
```javascript
import { requestAccess } from "@stellar/freighter-api";
await requestAccess();
```

### Step 3: Approve in Freighter
- A popup should appear
- Click "Approve"

### Step 4: Try Transaction
- Go back to your app
- Try sending payment again

---

## Prevention Tips

### 1. Don't Clear Browser Data
- Clearing cookies/cache can remove Freighter permissions
- If you must clear, re-connect the wallet after

### 2. Keep Freighter Updated
- Check for Freighter updates regularly
- Go to browser extensions page
- Update if available

### 3. Use Consistent Port
- Always use the same dev server port
- Freighter remembers permissions per domain:port
- If you change ports, you'll need to reconnect

### 4. Don't Lock Freighter During Transactions
- Keep Freighter unlocked while using the app
- Locking can interrupt permissions

---

## Debugging

### Check Connection Status

Add this to your browser console:

```javascript
import { isConnected, isAllowed, getAddress } from "@stellar/freighter-api";

console.log("Connected:", await isConnected());
console.log("Allowed:", await isAllowed());
console.log("Address:", await getAddress());
```

**Expected Output:**
```
Connected: { isConnected: true }
Allowed: { isAllowed: true }
Address: { address: "GABC..." }
```

**If any are false:**
- Reconnect the wallet
- Follow Solution 1 above

---

## Still Not Working?

### Try This Sequence:

1. **Close everything**
   - Close your app tab
   - Close Freighter popup
   - Close dev server

2. **Clear Freighter**
   - Open Freighter
   - Settings → Manage Connected Sites
   - Remove all localhost entries

3. **Restart dev server**
   ```bash
   npm run dev
   ```

4. **Fresh connection**
   - Open app in new tab
   - Connect wallet
   - Approve all permissions
   - Try transaction

5. **Check console**
   - Press F12
   - Look for any errors
   - Share errors if still failing

---

## Common Error Messages

### "User declined access"
**Cause:** You clicked "Reject" in Freighter
**Fix:** Try again and click "Approve"

### "Extension locked"
**Cause:** Freighter is locked
**Fix:** Unlock Freighter with your password

### "Network mismatch"
**Cause:** Wrong network selected
**Fix:** Switch to Testnet in Freighter settings

### "Account not found"
**Cause:** Account not funded
**Fix:** Use Friendbot to get test XLM

### "Insufficient balance"
**Cause:** Not enough XLM
**Fix:** Get more from Friendbot or send less

---

## Technical Details

### How Freighter Permissions Work

1. **First Connection:**
   - App calls `requestAccess()`
   - Freighter shows popup
   - User approves
   - Freighter stores permission for domain

2. **Subsequent Visits:**
   - App calls `getAddress()`
   - Freighter checks stored permissions
   - Returns address without popup

3. **Transaction Signing:**
   - App calls `signTransaction()`
   - Freighter checks if domain is allowed
   - If not allowed, shows error
   - If allowed, shows transaction details
   - User approves/rejects

### Why Permission Can Be Lost

- Browser cache cleared
- Freighter updated
- Domain/port changed
- Freighter settings reset
- Browser extension disabled/re-enabled

---

## Updated Code Features

The SendPayment component now:

✅ Checks permission before each transaction
✅ Automatically requests access if needed
✅ Shows helpful toast messages
✅ Provides better error messages
✅ Handles all Freighter error cases

---

## Need More Help?

1. **Check browser console** for detailed errors
2. **Check Freighter version** (should be 5.0+)
3. **Try different browser** to isolate issue
4. **Share error messages** for specific help

---

## Quick Checklist

Before sending a transaction, verify:

- [ ] Freighter is installed
- [ ] Freighter is unlocked
- [ ] Network is set to Testnet
- [ ] Wallet is connected (address shows in app)
- [ ] Account has XLM balance
- [ ] localhost is in Freighter's allowed sites
- [ ] No errors in browser console

If all checked, transaction should work! ✅
