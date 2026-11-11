"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useMemo } from "react";

export default function Home() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets, ready: walletsReady } = useWallets();

  // Compute response data whenever user state changes
  const loginResponse = useMemo(() => {
    if (ready && authenticated && user) {
      const responseData = {
        user: {
          id: user.id,
          createdAt: user.createdAt,
          linkedAccounts: user.linkedAccounts,
          wallet: user.wallet,
          google: user.google,
          email: user.email,
          twitter: user.twitter,
          apple: user.apple,
          discord: user.discord,
          github: user.github,
          customMetadata: user.customMetadata,
        },
        wallets: walletsReady
          ? wallets.map((w) => ({
              address: w.address,
              type: w.type,
              walletClientType: w.walletClientType,
              connectorType: w.connectorType,
            }))
          : [],
        authenticated,
        ready,
      };
      console.log("=== PRIVY RESPONSE DATA ===", responseData);
      return responseData;
    }
    return null;
  }, [ready, authenticated, user, wallets, walletsReady]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-center">
          <div className="mb-4 text-lg text-zinc-600 dark:text-zinc-400">
            Initializing Privy...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col gap-8 py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            Privy Authentication Demo
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Sign in with Google to automatically create a wallet in the
            background.
          </p>
        </div>

        {!authenticated ? (
          <div className="flex flex-col gap-4">
            <button
              onClick={login}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-white transition-colors hover:bg-blue-700 md:w-auto"
            >
              Sign In with Privy
            </button>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              This will open Privy&apos;s modal where you can sign in with Google,
              email, or connect a wallet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div>
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                  Welcome! You&apos;re signed in.
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  User ID: {user?.id}
                </p>
              </div>
              <button
                onClick={logout}
                className="rounded-full border border-zinc-300 bg-white px-6 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
              >
                Sign Out
              </button>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-zinc-50">
                User Information
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    User ID:
                  </span>{" "}
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {user?.id}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    Created At:
                  </span>{" "}
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
                {user?.google && (
                  <div>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      Google Account:
                    </span>{" "}
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {user.google.email || user.google.subject || "Connected"}
                    </span>
                  </div>
                )}
                {user?.email && (
                  <div>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      Email:
                    </span>{" "}
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {user.email.address}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-zinc-50">
                Wallet Information
              </h3>
              {walletsReady && wallets.length > 0 ? (
                <div className="space-y-4">
                  {wallets.map((wallet, index) => (
                    <div
                      key={index}
                      className="rounded border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800"
                    >
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            Address:
                          </span>{" "}
                          <span className="font-mono text-zinc-600 dark:text-zinc-400">
                            {wallet.address}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            Chain Type:
                          </span>{" "}
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {wallet.type}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            Wallet Type:
                          </span>{" "}
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {wallet.walletClientType}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            Connector:
                          </span>{" "}
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {wallet.connectorType}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : walletsReady ? (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  No wallets connected. A wallet should be created automatically
                  after Google sign-in.
                </p>
              ) : (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Loading wallet information...
                </p>
              )}

              {user?.wallet && (
                <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                  <div className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-100">
                    Primary Linked Wallet (from user object):
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium text-blue-800 dark:text-blue-200">
                        Address:
                      </span>{" "}
                      <span className="font-mono text-blue-700 dark:text-blue-300">
                        {user.wallet.address}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800 dark:text-blue-200">
                        Chain:
                      </span>{" "}
                      <span className="text-blue-700 dark:text-blue-300">
                        {user.wallet.chainType}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800 dark:text-blue-200">
                        Type:
                      </span>{" "}
                      <span className="text-blue-700 dark:text-blue-300">
                        {user.wallet.walletClientType}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 text-lg font-semibold text-black dark:text-zinc-50">
                Linked Accounts
              </h3>
              {user?.linkedAccounts && user.linkedAccounts.length > 0 ? (
                <div className="space-y-2">
                  {user.linkedAccounts.map((account, index) => (
                    <div
                      key={index}
                      className="rounded border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                    >
                      <div className="font-medium text-zinc-700 dark:text-zinc-300">
                        {account.type}
                      </div>
                      {account.type === "wallet" && (
                        <div className="mt-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                          {account.address}
                        </div>
                      )}
                      {account.type === "google_oauth" && (
                        <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                          {account.email || account.subject}
                        </div>
                      )}
                      {account.type === "email" && (
                        <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                          {account.address}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  No linked accounts found.
                </p>
              )}
            </div>

            {loginResponse && (
              <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="mb-4 text-lg font-semibold text-black dark:text-zinc-50">
                  Complete Privy Response Data
                </h3>
                <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                  This is the complete response object from Privy that you can
                  use in your application. Check the browser console for the
                  logged version.
                </p>
                <pre className="max-h-96 overflow-auto rounded border border-zinc-200 bg-zinc-50 p-4 text-xs dark:border-zinc-700 dark:bg-zinc-800">
                  {JSON.stringify(loginResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
