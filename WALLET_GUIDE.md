# Freighter Wallet Connection Guide

## Getting Started

### 1. Install Freighter Wallet

If you don't have Freighter installed:
1. Visit [freighter.app](https://www.freighter.app/)
2. Install the browser extension for Chrome, Firefox, or Edge
3. Create a new wallet or import an existing one
4. Switch to **Testnet** in Freighter settings

### 2. Connect Your Wallet

1. Open the dApp in your browser
2. Click the **"Connect Freighter"** button
3. Approve the connection in the Freighter popup
4. Your wallet is now connected! 🎉

### 3. Get Test XLM

If your account shows "Account not found":
1. Click **"Fund with Friendbot"** button
2. This will open Stellar Laboratory
3. Your address will be pre-filled
4. Click "Get test network lumens"
5. Wait a few seconds and refresh your balance

## Features

### Wallet Connection Card

**When Disconnected:**
- Shows "Connect Freighter" button
- Displays security badge
- Clear call-to-action

**When Connected:**
- ✅ Green checkmark indicator
- 📋 Full address display
- 🔄 Network badge (TESTNET)
- 📋 Copy button (copies full address)
- 🔗 Explorer link (view on Stellar Expert)
- 🚪 Disconnect button

### Balance Card

**Features:**
- 💰 Large, easy-to-read balance
- 🔄 Refresh button (updates balance)
- ⚠️ Low balance warning (< 1 XLM)
- 🎁 Friendbot link (get test XLM)
- ⏰ Last updated timestamp

**States:**
- Loading: Animated spinner
- Error: Clear error message with solution
- Success: Beautiful balance display

### Send Payment Card

**Features:**
- 📝 Destination address input (with validation)
- 💵 Amount input (with XLM badge)
- ✅ Real-time validation
- 🚀 Send button with loading states
- 📊 Transaction status updates

**Transaction Flow:**
1. Enter destination address (starts with 'G')
2. Enter amount (minimum 0.0000001 XLM)
3. Click "Send Payment"
4. Approve in Freighter popup
5. Wait for confirmation
6. See success message with transaction hash
7. Click "View on Explorer" to see details

## Notifications

The app uses toast notifications for:
- ✅ Wallet connected
- ℹ️ Wallet disconnected
- ✅ Address copied
- ✅ Balance updated
- ✅ Payment sent successfully
- ❌ Errors with helpful messages

## Tips & Tricks

### Quick Actions
- **Copy Address**: Click the copy button in the wallet card
- **Refresh Balance**: Click the refresh icon in the balance card
- **View on Explorer**: Click the explorer button to see your account details

### Keyboard Shortcuts
- `Tab`: Navigate between form fields
- `Enter`: Submit payment form (when focused)
- `Ctrl/Cmd + V`: Paste address

### Best Practices
1. Always verify the destination address before sending
2. Start with small test amounts
3. Keep some XLM for transaction fees (0.00001 XLM per transaction)
4. Check the transaction on Stellar Explorer after sending

## Troubleshooting

### "Freighter Required" Message
**Solution**: Install Freighter extension and refresh the page

### "Wrong Network" Warning
**Solution**: Open Freighter → Settings → Switch to "Testnet"

### "Account not found" Error
**Solution**: Click "Fund with Friendbot" to activate your account

### "Insufficient balance" Error
**Solution**: Get more test XLM from Friendbot

### Transaction Failed
**Possible causes:**
- Invalid destination address
- Insufficient balance
- Network issues
- Transaction rejected in Freighter

**Solution**: Check the error message for specific guidance

### Wallet Won't Connect
**Steps to fix:**
1. Refresh the page
2. Check if Freighter is unlocked
3. Try disconnecting and reconnecting
4. Clear browser cache
5. Reinstall Freighter if needed

## Security Notes

⚠️ **Important Security Information:**

1. **Testnet Only**: This app uses Stellar Testnet. Test XLM has no real value.
2. **Never Share Keys**: Never share your secret key with anyone
3. **Verify Transactions**: Always verify transaction details in Freighter before approving
4. **Secure Your Wallet**: Keep your Freighter password safe
5. **Check URLs**: Always verify you're on the correct website

## Support

For issues with:
- **Freighter Wallet**: Visit [freighter.app/support](https://www.freighter.app/)
- **Stellar Network**: Visit [stellar.org/developers](https://developers.stellar.org/)
- **This dApp**: Check the console for error messages

## Additional Resources

- [Stellar Documentation](https://developers.stellar.org/)
- [Freighter Documentation](https://docs.freighter.app/)
- [Stellar Laboratory](https://laboratory.stellar.org/)
- [Stellar Expert Explorer](https://stellar.expert/explorer/testnet)
