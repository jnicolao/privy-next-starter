# Privy Next.js Starter

A Next.js application integrated with Privy authentication, featuring Google sign-in and automatic wallet creation.

## Features

- Google OAuth sign-in via Privy
- Automatic embedded wallet creation for users without wallets
- Complete user and wallet data display
- Full Privy response data logging and visualization
- Support for multiple login methods (Google, Email, Wallet)

## Prerequisites

- Node.js 18+ installed
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

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
```

**Important:** Replace `your_privy_app_id_here` with your actual Privy App ID from the dashboard.

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
- Logged to the browser console (check DevTools)
- Displayed in a JSON format on the page
- Available via the `usePrivy` and `useWallets` hooks

### Key Components

- **`app/providers.tsx`**: PrivyProvider wrapper with configuration
  - Enables Google login
  - Auto-creates wallets for users without wallets
  - Configures appearance and supported chains

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
    createdAt: string;             // ISO 8601 timestamp
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
  wallets: Array;                  // All connected wallets
  authenticated: boolean;
  ready: boolean;
}
```

## Configuration

You can customize Privy behavior in `app/providers.tsx`:

- **Login Methods**: Add/remove login options
- **Wallet Creation**: Change when wallets are created (`createOnLogin`)
- **Appearance**: Customize theme, colors, logo
- **Chains**: Configure supported blockchains

## Documentation

- [Privy React Setup](https://docs.privy.io/basics/react/setup)
- [Privy Documentation](https://docs.privy.io/)
- [Privy User Object](https://docs.privy.io/user-management/users/the-user-object)
- [Embedded Wallets](https://docs.privy.io/guide/react/wallets/embedded/creation)

## Troubleshooting

### "App ID is required" error
- Make sure `.env.local` exists with `NEXT_PUBLIC_PRIVY_APP_ID` set
- Restart the dev server after adding environment variables

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
- [Privy React Guide](https://docs.privy.io/guide/react)
