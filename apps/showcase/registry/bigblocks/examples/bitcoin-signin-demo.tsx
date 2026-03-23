"use client"

import { BitcoinSignin } from "@/registry/bigblocks/blocks/bitcoin-signin"
import type { SigmaSignInFn } from "@/registry/bigblocks/blocks/bitcoin-signin/use-bitcoin-signin"

/**
 * Mock signIn function for demo purposes.
 * In a real app, this would be `authClient.signIn.sigma` from your
 * Better Auth client configured with the sigma plugin.
 */
const mockSignIn: SigmaSignInFn = async (options) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  // eslint-disable-next-line no-console
  console.log("[demo] signIn.sigma called with:", options)
}

export default function BitcoinSigninDemo() {
  return (
    <div className="flex flex-col items-start gap-8">
      {/* Default — Bitcoin-only sign-in */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">Default</p>
        <BitcoinSignin
          clientId="demo-app"
          signIn={mockSignIn}
        />
      </div>

      {/* With OAuth restore providers */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          With OAuth providers
        </p>
        <BitcoinSignin
          clientId="demo-app"
          signIn={mockSignIn}
          showProviders
          providers={["github", "google"]}
        />
      </div>

      {/* Outline variant, small */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Outline / Small
        </p>
        <BitcoinSignin
          clientId="demo-app"
          signIn={mockSignIn}
          variant="outline"
          size="sm"
        />
      </div>

      {/* Ghost variant, large */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Ghost / Large
        </p>
        <BitcoinSignin
          clientId="demo-app"
          signIn={mockSignIn}
          variant="ghost"
          size="lg"
        />
      </div>
    </div>
  )
}
