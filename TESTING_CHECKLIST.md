# Testing Checklist

Use this checklist to verify all functionality works correctly after the Freighter wallet integration improvements.

## Pre-Testing Setup

- [ ] Freighter extension installed
- [ ] Freighter unlocked
- [ ] Network set to Testnet in Freighter
- [ ] Browser console open (F12)
- [ ] No console errors on page load

---

## 1. Wallet Connection Tests

### Fresh Connection (First Time)
- [ ] Page loads without errors
- [ ] "Connect Freighter" button visible
- [ ] Click "Connect Freighter"
- [ ] Freighter popup appears
- [ ] Approve connection in popup
- [ ] Success toast appears
- [ ] Full address displays in card
- [ ] Network badge shows "TESTNET"
- [ ] Green checkmark indicator visible
- [ ] No console errors

### Auto-Connect (Returning User)
- [ ] Refresh the page
- [ ] Wallet auto-connects (no popup)
- [ ] Address appears immediately
- [ ] No errors in console
- [ ] Network badge correct

### Connection Rejection
- [ ] Click "Connect Freighter"
- [ ] Click "Reject" in Freighter popup
- [ ] Error toast appears
- [ ] Error message displayed in card
- [ ] Can retry connection

---

## 2. Address Management Tests

### Copy Address
- [ ] Click "Copy" button
- [ ] "Copied!" feedback appears
- [ ] Success toast shows
- [ ] Paste address elsewhere - matches exactly
- [ ] Button returns to "Copy" after 2 seconds

### View on Explorer
- [ ] Click "Explorer" button
- [ ] New tab opens
- [ ] Stellar Expert page loads
- [ ] Correct account displayed
- [ ] Network is Testnet

---

## 3. Balance Tests

### Initial Balance Load
- [ ] Balance card visible
- [ ] Loading spinner appears
- [ ] Balance loads successfully
- [ ] Number formatted correctly (with commas)
- [ ] "XLM" label visible
- [ ] Testnet badge shown
- [ ] Timestamp displayed

### Balance Refresh
- [ ] Click refresh button
- [ ] Spinner animates
- [ ] Balance updates
- [ ] Success toast appears
- [ ] Timestamp updates

### Account Not Found
- [ ] Use new/unfunded account
- [ ] Error message appears
- [ ] "Fund with Friendbot" button visible
- [ ] Click Friendbot button
- [ ] Stellar Laboratory opens
- [ ] Address pre-filled
- [ ] Get test XLM
- [ ] Refresh balance
- [ ] 10,000 XLM appears

### Low Balance Warning
- [ ] Send XLM until balance < 1
- [ ] Warning message appears
- [ ] Warning styled correctly (amber)
- [ ] Message is clear

---

## 4. Send Payment Tests

### Valid Transaction
- [ ] Enter valid destination address
- [ ] Enter amount (e.g., 10)
- [ ] Click "Send Payment"
- [ ] "Waiting for signature..." appears
- [ ] Freighter popup opens
- [ ] Transaction details correct
- [ ] Approve transaction
- [ ] "Submitting transaction..." appears
- [ ] Success message appears
- [ ] Transaction hash displayed
- [ ] Success toast shows amount
- [ ] "View on Explorer" button works
- [ ] Balance auto-refreshes
- [ ] Form clears

### Invalid Address
- [ ] Enter invalid address (e.g., "test123")
- [ ] Try to submit
- [ ] Error message appears
- [ ] Form doesn't submit
- [ ] Error is clear

### Insufficient Balance
- [ ] Try to send more than balance
- [ ] Transaction fails
- [ ] Error message clear
- [ ] Suggests solution

### Send to Self
- [ ] Enter your own address
- [ ] Try to submit
- [ ] Error: "Cannot send to your own address"
- [ ] Form doesn't submit

### Transaction Rejection
- [ ] Enter valid details
- [ ] Click "Send Payment"
- [ ] Reject in Freighter
- [ ] Error message appears
- [ ] Can retry

### Minimum Amount
- [ ] Try to send 0.00000001 XLM
- [ ] Should work (above minimum)
- [ ] Try to send 0 XLM
- [ ] Should fail with error

---

## 5. Network Tests

### Wrong Network
- [ ] Switch Freighter to Mainnet
- [ ] Try to connect
- [ ] Warning appears
- [ ] Clear instructions shown
- [ ] Switch back to Testnet
- [ ] Connection works

### Network Badge
- [ ] Check all cards show network badge
- [ ] Badge says "TESTNET" or "Testnet"
- [ ] Badge styled correctly

---

## 6. Disconnect Tests

### Manual Disconnect
- [ ] Click "Disconnect" button
- [ ] Wallet disconnects
- [ ] Info toast appears
- [ ] Address cleared
- [ ] Balance card shows "Not connected"
- [ ] Send card shows "Not connected"
- [ ] Can reconnect

---

## 7. UI/UX Tests

### Animations
- [ ] Fade-in animations smooth
- [ ] Slide-in animations work
- [ ] Loading spinners animate
- [ ] Hover effects work
- [ ] Transitions smooth

### Toast Notifications
- [ ] Success toasts green
- [ ] Error toasts red
- [ ] Info toasts blue
- [ ] Toasts auto-dismiss
- [ ] Multiple toasts stack correctly

### Responsive Design
- [ ] Test on mobile size (< 640px)
- [ ] Test on tablet size (640-1024px)
- [ ] Test on desktop (> 1024px)
- [ ] All cards stack properly
- [ ] Buttons accessible
- [ ] Text readable

### Accessibility
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Can submit form with Enter key
- [ ] Screen reader friendly (test if possible)
- [ ] Color contrast sufficient

---

## 8. Error Handling Tests

### Freighter Not Installed
- [ ] Disable/remove Freighter
- [ ] Refresh page
- [ ] "Freighter Required" message
- [ ] Install link works
- [ ] Refresh button works after install

### Freighter Locked
- [ ] Lock Freighter
- [ ] Try to connect
- [ ] Freighter prompts for password
- [ ] After unlock, connection works

### Network Error
- [ ] Disconnect internet
- [ ] Try to load balance
- [ ] Error message appears
- [ ] Reconnect internet
- [ ] Retry works

---

## 9. Performance Tests

### Load Time
- [ ] Page loads in < 3 seconds
- [ ] No layout shift
- [ ] Images load properly
- [ ] Fonts load correctly

### Interaction Speed
- [ ] Buttons respond immediately
- [ ] Forms feel responsive
- [ ] Animations don't lag
- [ ] No freezing

---

## 10. Browser Compatibility

Test in multiple browsers:

### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] UI renders correctly

### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] UI renders correctly

### Edge
- [ ] All features work
- [ ] No console errors
- [ ] UI renders correctly

### Safari (if available)
- [ ] All features work
- [ ] No console errors
- [ ] UI renders correctly

---

## 11. Console Tests

### No Errors
- [ ] No errors on page load
- [ ] No errors on connection
- [ ] No errors on transaction
- [ ] No errors on disconnect

### Proper Logging
- [ ] Connection logs clear
- [ ] Error logs helpful
- [ ] No sensitive data logged

---

## 12. Edge Cases

### Rapid Clicking
- [ ] Click connect multiple times rapidly
- [ ] No duplicate connections
- [ ] No errors

### Multiple Tabs
- [ ] Open app in two tabs
- [ ] Connect in tab 1
- [ ] Switch to tab 2
- [ ] Behavior is predictable

### Long Session
- [ ] Keep app open for 10+ minutes
- [ ] Connection stays active
- [ ] Can still send transactions

---

## Final Checks

- [ ] All tests passed
- [ ] No console errors
- [ ] No visual glitches
- [ ] Performance acceptable
- [ ] Ready for production

---

## Test Results

**Date Tested:** _____________

**Tested By:** _____________

**Browser:** _____________

**Freighter Version:** _____________

**Pass Rate:** _____ / _____ tests

**Issues Found:**
1. _____________
2. _____________
3. _____________

**Notes:**
_____________________________________________
_____________________________________________
_____________________________________________

---

## Automated Testing (Future)

Consider adding automated tests for:
- [ ] Component rendering
- [ ] API mocking
- [ ] User interactions
- [ ] Error scenarios
- [ ] Network conditions

---

**Status:** 
- [ ] All tests passed - Ready for production
- [ ] Some tests failed - Needs fixes
- [ ] Not tested yet

**Approved By:** _____________

**Date:** _____________
