# Troubleshooting Guide

## Common Issues and Solutions

### 1. "getPublicKey is not a function" Error

**Error Message:**
```
TypeError: getPublicKey is not a function
```

**Cause:**
The `@stellar/freighter-api` package doesn't have a `getPublicKey()` function. This is a common mistake when following outdated documentation.

**Solution:**
Use the correct Freighter API methods:

```javascript
// ❌ WRONG - This doesn't exist
import { getPublicKey } from "@stellar/freighter-api";
const pubKey = await getPublicKey();

// ✅ CORRECT - Use requestAccess()
import { requestAccess } from "@stellar/freighter-api";
const accessObj = await requestAccess();
if (!accessObj.error) {
  const pubKey = accessObj.address;
}

// ✅ CORRECT - Or use getAddress() for silent retrieval
import { getAddress } from "@stellar/freighter-api";
const addressObj = await getAddress();
const pubKey = addressObj.address; // Returns empty string if not allowed
```

**Fixed in:** This has been corrected in the latest version of WalletConnect.jsx

---

### 2. Freighter Not Detected

**Symptoms:**
- "Freighter Required" message appears
- Extension is installed but not detected

**Solutions:**

1. **Refresh the page** after installing Freighter
2. **Check if Freighter is enabled** in your browser extensions
3. **Unlock Freighter** if it's locked
4. **Try a different browser** (Chrome, Firefox, Edge supported)
5. **Reinstall Freighter** if issues persist

**Code to check:**
```javascript
import { isConnected } from "@stellar/freighter-api";

const checkFreighter = async () => {
  const result = await isConnected();
  console.log("Freighter connected:", result.isConnected);
};
```

---

### 3. Wrong Network Error

**Symptoms:**
- "Please switch to Stellar Testnet" warning
- Transactions fail with network errors

**Solution:**

1. Open Freighter extension
2. Click the settings icon (gear)
3. Select "Network"
4. Choose "Testnet"
5. Refresh your dApp

**Code to check network:**
```javascript
import { getNetwork } from "@stellar/freighter-api";

const checkNetwork = async () => {
  const result = await getNetwork();
  console.log("Current network:", result.network);
  // Should be "TESTNET" for this dApp
};
```

---

### 4. Account Not Found Error

**Symptoms:**
- Balance shows "Account not found"
- Can't send transactions

**Cause:**
New Stellar accounts must be funded with at least 1 XLM to be activated on the network.

**Solution:**

1. Click "Fund with Friendbot" button in the Balance card
2. Wait 5-10 seconds
3. Click the refresh button
4. You should now see 10,000 test XLM

**Manual Friendbot:**
```
Visit: https://laboratory.stellar.org/#account-creator?network=test
Paste your public key
Click "Get test network lumens"
```

---

### 5. Transaction Signing Cancelled

**Symptoms:**
- Transaction fails with "signing was cancelled"
- Freighter popup closes without signing

**Causes:**
- User clicked "Reject" in Freighter
- Freighter popup timed out (5 minutes)
- User closed the popup

**Solution:**
- Try the transaction again
- Make sure to approve within 5 minutes
- Check that you're not blocking popups

---

### 6. Insufficient Balance Error

**Symptoms:**
- "Insufficient balance for this transaction"
- Transaction fails after signing

**Causes:**
- Not enough XLM to cover amount + fees
- Trying to send all XLM (need to keep minimum reserve)

**Solution:**
- Keep at least 1 XLM in your account
- Transaction fees are ~0.00001 XLM
- Try sending a smaller amount

---

### 7. Invalid Address Format

**Symptoms:**
- "Invalid Stellar address format" error
- Can't submit payment form

**Causes:**
- Address doesn't start with 'G'
- Address is not 56 characters
- Copied address with extra spaces

**Solution:**
- Stellar addresses always start with 'G'
- Must be exactly 56 characters
- Remove any spaces or line breaks
- Example: `GABC...XYZ` (56 chars total)

**Validation code:**
```javascript
import { isValidPublicKey } from '@/stellar/stellarClient';

const isValid = isValidPublicKey(address);
console.log("Valid address:", isValid);
```

---

### 8. Build Errors

**Error:** Module not found or import errors

**Solutions:**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev

# Check for TypeScript errors
npm run lint
```

---

### 9. Toast Notifications Not Showing

**Symptoms:**
- No success/error messages appear
- Actions complete but no feedback

**Causes:**
- Sonner not properly configured
- Toaster component not in App.tsx

**Solution:**

Check that `App.tsx` includes:
```jsx
import { Toaster } from "@/components/ui/sonner";

const App = () => (
  <>
    <Toaster />
    {/* Your app content */}
  </>
);
```

---

### 10. Auto-Connect Not Working

**Symptoms:**
- Have to reconnect every time
- Wallet doesn't remember authorization

**Causes:**
- Browser clearing cookies/storage
- Freighter permissions reset
- Using incognito/private mode

**Solution:**
- Allow cookies for the site
- Don't use incognito mode
- Re-authorize the dApp in Freighter settings

---

## Debug Mode

Enable detailed logging:

```javascript
// Add to WalletConnect.jsx
const DEBUG = true;

const connectWallet = async () => {
  if (DEBUG) console.log("Starting wallet connection...");
  
  try {
    const accessObj = await requestAccess();
    if (DEBUG) console.log("Access result:", accessObj);
    
    // ... rest of code
  } catch (err) {
    if (DEBUG) console.error("Connection error:", err);
  }
};
```

---

## Getting Help

### Check Browser Console
1. Press F12 to open DevTools
2. Go to Console tab
3. Look for error messages
4. Copy the full error for support

### Verify Freighter Version
1. Open Freighter extension
2. Click settings
3. Scroll to bottom
4. Check version (should be 5.0+)

### Test with Stellar Laboratory
Visit [Stellar Laboratory](https://laboratory.stellar.org/) to test:
- Account creation
- Transaction building
- Network connectivity

### Community Support
- [Stellar Discord](https://discord.gg/stellar)
- [Stellar Stack Exchange](https://stellar.stackexchange.com/)
- [Freighter GitHub Issues](https://github.com/stellar/freighter/issues)

---

## API Reference Quick Links

- [Freighter Documentation](https://docs.freighter.app/)
- [Stellar SDK Documentation](https://stellar.github.io/js-stellar-sdk/)
- [Horizon API Reference](https://developers.stellar.org/api/horizon)
- [Stellar Laboratory](https://laboratory.stellar.org/)

---

## Environment Check

Run this in your browser console to check your setup:

```javascript
// Check Freighter
console.log("Freighter installed:", typeof window.freighterApi !== 'undefined');

// Check network
import { getNetwork } from '@stellar/freighter-api';
const network = await getNetwork();
console.log("Network:", network);

// Check connection
import { isConnected, isAllowed } from '@stellar/freighter-api';
console.log("Connected:", await isConnected());
console.log("Allowed:", await isAllowed());
```

---

## Still Having Issues?

1. **Clear browser cache** and reload
2. **Try a different browser**
3. **Reinstall Freighter**
4. **Check Freighter GitHub** for known issues
5. **Ask in Stellar Discord** with error details
