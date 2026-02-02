# New Application Structure

## Overview

The application has been restructured into a beautiful multi-page flow with improved UI/UX and better organization.

## Page Flow

```
Landing Page (/)
    ↓
Connect Wallet (/connect)
    ↓
Dashboard (/dashboard)
    ↓
Transaction History (/history)
```

## Pages

### 1. Landing Page (`/`)

**Purpose:** Beautiful hero section to introduce the app

**Features:**
- Eye-catching hero section with gradient text
- Feature cards (Fast, Secure, Low Fees)
- "How It Works" section with 4 steps
- Stats display (Speed, Fees, Uptime, Network)
- Call-to-action buttons
- Smooth animations on scroll

**Design Elements:**
- Gradient backgrounds
- Animated badges
- Feature icons with gradient backgrounds
- Numbered steps with checkmarks
- Responsive grid layout

**Navigation:**
- "Get Started" → `/connect`
- "Learn More" → Stellar docs
- Header links to docs and GitHub

---

### 2. Connect Page (`/connect`)

**Purpose:** Dedicated wallet connection page

**Features:**
- Centered wallet connection card
- Back button to landing page
- Auto-redirect to dashboard on successful connection
- Helper cards for:
  - Installing Freighter
  - Getting test XLM
- Clean, focused design

**User Flow:**
1. User clicks "Connect Freighter"
2. Freighter popup appears
3. User approves connection
4. Success toast appears
5. Auto-redirect to dashboard (1 second delay)

**State Management:**
- Stores public key in localStorage
- Passes public key to dashboard via navigation state

---

### 3. Dashboard Page (`/dashboard`)

**Purpose:** Main application dashboard

**Features:**
- Balance card (left side)
- Send payment card (right side)
- Quick actions section
- Responsive header with:
  - Logo
  - Wallet address (truncated)
  - History button
  - Disconnect button
- Mobile menu for small screens

**Layout:**
- 2-column grid on desktop
- Stacked on mobile
- Sticky header
- Animated card entrance

**Navigation:**
- "History" button → `/history`
- "View on Explorer" → Stellar Expert
- "Disconnect" → Clear storage, redirect to `/`
- Back button redirects to connect if no wallet

**State Management:**
- Reads public key from localStorage
- Refreshes balance after transactions
- Persists wallet connection across page reloads

---

### 4. History Page (`/history`)

**Purpose:** Detailed transaction history view

**Features:**
- Full transaction list (up to 50 transactions)
- Each transaction shows:
  - Direction (sent/received) with icon
  - Amount with color coding
  - Status badge (success/failed)
  - Timestamp
  - Other party address
  - Transaction hash
  - Memo (if present)
- Copy buttons for addresses and hashes
- External link to Stellar Expert
- Refresh button
- Loading states
- Empty state
- Error state

**Transaction Card Design:**
- Gradient icon background
- Color-coded amounts (red for sent, green for received)
- Collapsible details section
- Hover effects
- Smooth animations

**Actions:**
- Copy address
- Copy transaction hash
- View on Stellar Expert
- Refresh history
- Back to dashboard

---

## Component Structure

### Reusable Components

**WalletConnect** (`src/components/WalletConnect.jsx`)
- Handles Freighter connection
- Network verification
- Auto-connect on page load
- Copy address functionality
- Explorer link

**Balance** (`src/components/Balance.jsx`)
- Displays XLM balance
- Refresh button
- Friendbot link
- Low balance warning
- Loading states

**SendPayment** (`src/components/SendPayment.jsx`)
- Payment form
- Address validation
- Amount validation
- Transaction signing
- Success/error handling
- Toast notifications

**TransactionHistory** (used in History page)
- Fetches transaction history
- Formats transaction data
- Displays transaction cards

---

## Routing

**Routes defined in `src/App.tsx`:**

```typescript
/ → Landing
/connect → Connect
/dashboard → Dashboard
/history → History
/* → NotFound (404)
```

**Protected Routes:**
- `/dashboard` - Redirects to `/connect` if no wallet
- `/history` - Redirects to `/connect` if no wallet

---

## State Management

### localStorage Keys

**`stellar_public_key`**
- Stores connected wallet address
- Used for auto-connect
- Cleared on disconnect

### Navigation State

**Connect → Dashboard:**
```typescript
navigate("/dashboard", { 
  state: { publicKey: "GABC..." } 
});
```

**Dashboard reads:**
```typescript
const stateKey = location.state?.publicKey;
const storedKey = localStorage.getItem("stellar_public_key");
```

---

## Design System

### Colors

**Primary:** Stellar Blue (#3B9DFF)
**Secondary:** Deep Purple
**Success:** Green (for received transactions)
**Destructive:** Red (for sent transactions)
**Warning:** Amber
**Muted:** Gray tones

### Typography

**Headings:**
- H1: text-4xl md:text-6xl (Landing hero)
- H2: text-3xl md:text-4xl (Page titles)
- H3: text-2xl md:text-3xl (Section titles)

**Body:**
- Large: text-lg md:text-xl
- Normal: text-base
- Small: text-sm
- Extra small: text-xs

### Spacing

**Sections:** py-16 md:py-24
**Cards:** p-6 md:p-8
**Gaps:** gap-4, gap-6, gap-8

### Animations

**Fade In:**
```css
animate-in fade-in duration-500
```

**Slide In:**
```css
animate-in slide-in-from-bottom duration-700
```

**With Delay:**
```css
style={{ animationDelay: '200ms' }}
```

---

## Responsive Design

### Breakpoints

**Mobile:** < 640px
**Tablet:** 640px - 1024px
**Desktop:** > 1024px

### Layout Changes

**Landing:**
- Hero: Single column → Full width
- Features: Stack → 3-column grid
- Stats: 2 columns → 4 columns

**Dashboard:**
- Cards: Stack → 2-column grid
- Header: Mobile menu → Full nav

**History:**
- Transactions: Full width on all sizes
- Details: Stack on mobile

---

## User Experience Flow

### First-Time User

1. **Lands on homepage**
   - Sees hero section
   - Reads features
   - Clicks "Get Started"

2. **Connect page**
   - Sees wallet connection card
   - Clicks "Connect Freighter"
   - Approves in Freighter
   - Auto-redirected to dashboard

3. **Dashboard**
   - Sees balance (or "Account not found")
   - Clicks "Fund with Friendbot" if needed
   - Sends first payment
   - Sees success message

4. **History page**
   - Clicks "History" button
   - Sees transaction list
   - Can copy addresses/hashes
   - Can view on explorer

### Returning User

1. **Lands on homepage**
   - Clicks "Get Started"

2. **Connect page**
   - Auto-connects (no popup)
   - Auto-redirected to dashboard

3. **Dashboard**
   - Sees current balance
   - Can send payments immediately

---

## Error Handling

### Connection Errors

**Freighter not installed:**
- Shows installation card
- Link to Freighter website

**Wrong network:**
- Shows warning banner
- Instructions to switch network

**Connection rejected:**
- Shows error toast
- Can retry connection

### Transaction Errors

**Insufficient balance:**
- Clear error message
- Suggests getting more XLM

**Invalid address:**
- Inline validation
- Prevents submission

**Network error:**
- Error toast
- Retry button

### History Errors

**Failed to load:**
- Error card with retry button
- Clear error message

**No transactions:**
- Empty state card
- Link back to dashboard

---

## Performance

### Optimizations

**Code Splitting:**
- Each page is a separate component
- Lazy loading possible (future)

**State Management:**
- localStorage for persistence
- Minimal re-renders
- Efficient updates

**Animations:**
- CSS-based (GPU accelerated)
- Staggered delays for lists
- Smooth transitions

### Loading States

**Balance:** Spinner with message
**History:** Centered spinner
**Transactions:** Skeleton loading (future)

---

## Accessibility

### Keyboard Navigation

- Tab through all interactive elements
- Enter to submit forms
- Escape to close modals (future)

### Screen Readers

- Semantic HTML
- ARIA labels where needed
- Alt text for icons

### Color Contrast

- WCAG AA compliant
- Sufficient contrast ratios
- Color not sole indicator

---

## Future Enhancements

### Planned Features

- [ ] Address book
- [ ] QR code scanning
- [ ] Transaction filtering
- [ ] Export history (CSV)
- [ ] Multi-asset support
- [ ] Transaction memos
- [ ] Dark/light theme toggle
- [ ] Multiple language support

### Technical Improvements

- [ ] Lazy loading routes
- [ ] Service worker (PWA)
- [ ] Automated tests
- [ ] Error boundary
- [ ] Analytics integration

---

## Development

### Running Locally

```bash
npm run dev
```

### Building

```bash
npm run build
```

### Testing Flow

1. Start dev server
2. Visit http://localhost:5173
3. Click through all pages
4. Test wallet connection
5. Test sending payment
6. Check transaction history

---

## File Structure

```
src/
├── pages/
│   ├── Landing.tsx       # Homepage
│   ├── Connect.tsx       # Wallet connection
│   ├── Dashboard.tsx     # Main dashboard
│   ├── History.tsx       # Transaction history
│   └── NotFound.tsx      # 404 page
├── components/
│   ├── WalletConnect.jsx # Wallet connection component
│   ├── Balance.jsx       # Balance display
│   ├── SendPayment.jsx   # Payment form
│   └── ui/               # shadcn/ui components
├── stellar/
│   └── stellarClient.js  # Stellar SDK utilities
├── App.tsx               # App root with routes
└── main.tsx              # Entry point
```

---

## Summary

The new structure provides:

✅ **Better UX** - Clear page flow
✅ **Modern Design** - Beautiful animations
✅ **Responsive** - Works on all devices
✅ **Accessible** - Keyboard and screen reader friendly
✅ **Maintainable** - Organized code structure
✅ **Scalable** - Easy to add features

The app now feels like a professional product with smooth transitions, clear navigation, and delightful interactions!
