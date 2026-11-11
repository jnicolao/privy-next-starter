# Privy Next.js Starter

A Next.js application integrated with Privy authentication, featuring Google sign-in and automatic wallet creation.

## Features

- Google OAuth sign-in via Privy
- Automatic embedded wallet creation for users without wallets
- Complete user and wallet data display
- Full Privy response data visualization, with console logging in development only
- Support for multiple login methods (Google, Email, Wallet)

## Prerequisites

- Node.js 20.9 or later (required by Next.js 16)
- A Privy account and App ID ([Get one here](https://privy.io))

## Setup Instructions

### 1. Get Your Privy App ID

1. Go to [Privy Dashboard](https://dashboard.privy.io)
2. Create a new app or select an existing one
3. Copy your **App ID** from the dashboard
4. In the dashboard, make sure **Google** is enabled as a login method:
   - Go to **Login Methods** in your app settings
   - Enable **Google OAuth**

### 2. Configure Environment Variables

Copy the example file and add your App ID:

```bash
cp .env.example .env.local
```

```bash
NEXT_PUBLIC_PRIVY_APP_ID=your_25_character_app_id
```

If the ID is missing or the wrong length, the app shows setup steps instead of starting Privy, so it still builds and runs while you get one.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Authentication Flow

1. User clicks "Sign In with Privy"
2. Privy modal opens with login options (Google, Email, Wallet)
3. User signs in with Google
4. Privy automatically creates an embedded wallet in the background (if user doesn't have one)
5. User data and wallet information are displayed on the page

### Privy Response Data

After login, the application captures and displays:

- **User Object**: Contains user ID, creation date, linked accounts
- **Wallet Information**: Address, chain type, wallet client type, connector type
- **Linked Accounts**: All authentication methods linked to the user
- **Google Account**: Email, name, and subject from Google OAuth

All response data is:
- Logged to the browser console in development (check DevTools). It contains the user's email and wallet addresses, so it's stripped from production builds
- Displayed in a JSON format on the page
- Available via the `usePrivy` and `useWallets` hooks

### Key Components

- **`app/providers.tsx`**: PrivyProvider wrapper with configuration
  - Enables Google login
  - Auto-creates wallets for users without wallets
  - Configures appearance
  - Shows setup steps instead of starting Privy when the App ID is missing or malformed

- **`app/page.tsx`**: Main page component
  - Login/logout UI
  - User information display
  - Wallet information display
  - Complete Privy response data visualization

## Using Privy Data in Your Application

The response data from Privy is available through React hooks:

```tsx
import { usePrivy, useWallets } from "@privy-io/react-auth";

function MyComponent() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets, ready: walletsReady } = useWallets();

  // Access user data
  const userId = user?.id;
  const userEmail = user?.google?.email || user?.email?.address;
  const primaryWallet = user?.wallet?.address;

  // Access connected wallets
  const firstWallet = wallets[0]?.address;
}
```

### Response Data Structure

```typescript
{
  user: {
    id: string;                    // Privy DID
    createdAt: Date;               // shown as an ISO 8601 string in the JSON panel
    linkedAccounts: Array;         // All linked accounts
    wallet: {                      // Primary wallet
      address: string;
      chainType: "ethereum" | "solana";
      walletClientType: string;
      connectorType: string;
    };
    google: {                      // Google OAuth data
      email: string;
      name: string;
      subject: string;
    };
  };
  wallets: Array<{                 // Connected Ethereum wallets (useWallets)
    address: string;
    type: "ethereum";
    walletClientType: string;
    connectorType: string;
  }>;
  authenticated: boolean;
  ready: boolean;
}
```

## Configuration

You can customize Privy behavior in `app/providers.tsx`:

- **Login Methods**: Add/remove login options
- **Wallet Creation**: Change when wallets are created (`createOnLogin`)
- **Appearance**: Customize theme, colors, logo
- **Chains**: Not configured by default; see Privy's [network configuration](https://docs.privy.io/basics/react/advanced/configuring-evm-networks) to add one

## Documentation

- [Privy React Setup](https://docs.privy.io/basics/react/setup)
- [Privy Documentation](https://docs.privy.io/)
- [Privy User Object](https://docs.privy.io/user-management/users/the-user-object)
- [Embedded Wallets](https://docs.privy.io/basics/react/advanced/automatic-wallet-creation)

## Troubleshooting

### "Add your Privy app ID" screen
- Make sure `.env.local` exists with `NEXT_PUBLIC_PRIVY_APP_ID` set to your 25-character App ID
- Restart the dev server after changing environment variables. Next reads them at startup, and inlines them at build time, so a deployed build needs rebuilding too

### "Embedded wallet is only available over HTTPS"
- Privy only runs embedded wallets on `localhost` or over HTTPS, so deploy behind HTTPS rather than plain HTTP

### Google login not showing
- Verify Google OAuth is enabled in your Privy Dashboard
- Check that your App ID is correct

### Wallet not created automatically
- Ensure `createOnLogin: "users-without-wallets"` is set in `providers.tsx`
- Check browser console for any errors
- Wallet creation happens in the background and may take a few seconds

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Privy Documentation](https://docs.privy.io/)
- [Privy React Guide](https://docs.privy.io/basics/react/installation)

## Updating dependencies

Regenerate `package-lock.json` with npm 10:

```bash
npx npm@10 install
```

Node 20 and 22 ship npm 10, and a lockfile written by npm 11 fails `npm ci` on them. CI builds on both, so it will catch this if it happens.

## License

MIT — see [LICENSE](LICENSE).
