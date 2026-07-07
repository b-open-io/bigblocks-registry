"use client"

import { useState } from "react"
import {
  UnlockWallet,
  type UnlockWalletResult,
} from "@/registry/bigblocks/blocks/unlock-wallet"

export default function UnlockWalletDemo() {
  const [unlockCount, setUnlockCount] = useState(0)

  async function handleUnlock(
    _passphrase?: string,
  ): Promise<UnlockWalletResult> {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Fail every other attempt for demo purposes
    if (unlockCount % 2 === 0) {
      setUnlockCount((prev) => prev + 1)
      return { success: false, error: "Invalid passphrase. Try again." }
    }

    setUnlockCount((prev) => prev + 1)
    return { success: true }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <UnlockWallet
        platform="macos"
        appName="BigBlocks Wallet"
        onUnlock={handleUnlock}
        onSuccess={() => console.log("Wallet unlocked via Touch ID")}
        onError={(error) => console.error("Unlock error:", error)}
      />
    </div>
  )
}
