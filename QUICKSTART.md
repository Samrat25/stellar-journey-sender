# Quick Start Guide

## For Users

### 1. Install Freighter
```
1. Visit https://www.freighter.app/
2. Install browser extension
3. Create/import wallet
4. Switch to Testnet in settings
```

### 2. Open the dApp
```
1. Visit the deployed URL
2. Click "Connect Freighter"
3. Approve connection
4. Done! 🎉
```

### 3. Get Test XLM
```
1. Click "Fund with Friendbot"
2. Get 10,000 test XLM
3. Start sending payments
```

## For Developers

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-name>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run linter
npm run lint
```

### Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Balance.jsx      # Balance display component
│   ├── SendPayment.jsx  # Payment form component
│   ├── WalletConnect.jsx # Wallet connection component
│   └── TransactionHistory.jsx
├── stellar/
│   └── stellarClient.js # Stellar SDK utilities
├── pages/
│   ├── Index.tsx        # Main page
│   └── NotFound.tsx     # 404 page
├── App.tsx              # App root
├── main.tsx             # Entry point
└── index.css            # Global styles
```

### Key Files

**WalletConnect.jsx**
- Handles Freighter wallet connection
- Displays wallet status and address
- Manages network verification

**Balance.jsx**
- Fetches and displays XLM balance
- Handles balance refresh
- Shows Friendbot link

**SendPayment.jsx**
- Payment form with validation
- Transaction building and signing
- Success/error handling

**stellarClient.js**
- Stellar SDK wrapper functions
- Transaction building utilities
- Network configuration

### Environment Variables

No environment variables needed for Testnet.

For Mainnet (future):
```env
VITE_STELLAR_NETWORK=mainnet
VITE_HORIZON_URL=https://horizon.stellar.org
```

### Customization

**Colors** (tailwind.config.ts):
```typescript
colors: {
  primary: "...",    // Stellar blue
  secondary: "...",  // Deep purple
  success: "...",    // Green
  warning: "...",    // Amber
}
```

**Animations** (src/index.css):
```css
@keyframes customAnimation {
  /* Your animation */
}
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- Balance.test.jsx
```

### Deployment

**Via Lovable:**
1. Open project in Lovable
2. Click Share → Publish
3. Done!

**Via Vercel:**
```bash
npm install -g vercel
vercel
```

**Via Netlify:**
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Troubleshooting

**Build fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Freighter not detected:**
```bash
# Check browser console for errors
# Ensure Freighter is installed and unlocked
```

**TypeScript errors:**
```bash
# Check diagnostics
npm run lint
```

## API Reference

### WalletConnect Props

```typescript
interface WalletConnectProps {
  publicKey: string | null;
  onConnect: (publicKey: string) => void;
  onDisconnect: () => void;
}
```

### Balance Props

```typescript
interface BalanceProps {
  publicKey: string | null;
}
```

### SendPayment Props

```typescript
interface SendPaymentProps {
  publicKey: string | null;
  onTransactionComplete: () => void;
  prefilledDestination?: string;
}
```

## Stellar SDK Usage

### Get Balance
```javascript
import { getBalance } from '@/stellar/stellarClient';

const balance = await getBalance(publicKey);
```

### Build Transaction
```javascript
import { buildPaymentTransaction } from '@/stellar/stellarClient';

const xdr = await buildPaymentTransaction(
  sourcePublicKey,
  destinationPublicKey,
  amount
);
```

### Sign Transaction
```javascript
import { signTransaction } from '@stellar/freighter-api';

const signedXDR = await signTransaction(xdr, {
  network: 'TESTNET',
  networkPassphrase: NETWORK_PASSPHRASE,
  accountToSign: publicKey,
});
```

### Submit Transaction
```javascript
import { submitTransaction } from '@/stellar/stellarClient';

const result = await submitTransaction(signedXDR);
console.log('Transaction hash:', result.hash);
```

## Resources

- [Stellar Docs](https://developers.stellar.org/)
- [Freighter Docs](https://docs.freighter.app/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## Support

- GitHub Issues: [Create an issue]
- Discord: [Join our server]
- Email: support@example.com

## License

MIT License - see LICENSE file for details
