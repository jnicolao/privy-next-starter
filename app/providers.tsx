"use client";

import { PrivyProvider } from "@privy-io/react-auth";

// Privy accepts only a 25-character app ID and throws on anything else —
// including during `next build`, when the page is prerendered. Checking the
// same rule here turns a missing or mistyped ID into setup instructions
// rather than a stack trace, and lets the app build without one.
const PRIVY_APP_ID_LENGTH = 25;
const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID?.trim() ?? "";

export function Providers({ children }: { children: React.ReactNode }) {
  if (appId.length !== PRIVY_APP_ID_LENGTH) {
    return <MissingAppId found={appId} />;
  }

  return (
    <PrivyProvider
      appId={appId}
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

function MissingAppId({ found }: { found: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="max-w-lg rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
          {found ? "That Privy app ID isn't valid" : "Add your Privy app ID"}
        </h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          {found
            ? `NEXT_PUBLIC_PRIVY_APP_ID is ${found.length} characters long. Privy app IDs are exactly ${PRIVY_APP_ID_LENGTH}.`
            : "NEXT_PUBLIC_PRIVY_APP_ID isn't set, so Privy can't start."}
        </p>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            Copy <code className="font-mono">.env.example</code> to{" "}
            <code className="font-mono">.env.local</code>
          </li>
          <li>
            Paste your App ID from{" "}
            <a className="underline" href="https://dashboard.privy.io">
              dashboard.privy.io
            </a>
          </li>
          <li>Restart the dev server — Next reads env files at startup</li>
        </ol>
      </div>
    </div>
  );
}
