"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        // Enable Google login
        loginMethods: ["google", "email", "wallet"],
        // Auto-create embedded wallet for users without wallets
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        // Appearance customization
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          // logo: "https://your-logo-url.com/logo.png", // Optional: add your logo
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
