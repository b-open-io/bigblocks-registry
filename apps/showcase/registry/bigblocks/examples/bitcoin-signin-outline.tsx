"use client"

import { BitcoinSignin } from "@/registry/bigblocks/blocks/bitcoin-signin"
import type { SigmaSignInFn } from "@/registry/bigblocks/blocks/bitcoin-signin/use-bitcoin-signin"

const mockSignIn: SigmaSignInFn = async (options) => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log("[demo] signIn.sigma called with:", options)
}

export default function BitcoinSigninOutlineDemo() {
  return (
    <div className="flex items-center justify-center">
      <BitcoinSignin
        clientId="demo-app"
        signIn={mockSignIn}
        variant="outline"
        size="sm"
      />
    </div>
  )
}
