"use client"

import { useState } from "react"
import {
  UnlockWallet,
  type UnlockWalletResult,
} from "@/registry/new-york/blocks/unlock-wallet"

export default function UnlockWalletDemo() {
  const [unlockCount, setUnlockCount] = useState(0)

  async function handleUnlock(
    passphrase?: string,
  ): Promise<UnlockWalletResult> {
    // In a real application, verify the passphrase against
    // the encrypted backup or invoke the platform biometric API.
    //
    // import { decryptBackup } from "bitcoin-backup"
    //
    // if (passphrase) {
    //   const backup = localStorage.getItem("encryptedBackup")
    //   const decrypted = await decryptBackup(backup, passphrase)
    //   if (!decrypted) return { success: false, error: "Invalid passphrase" }
    //   sessionStorage.setItem("decryptedBackup", decrypted)
    //   return { success: true }
    // }
    // // Biometric: delegate to OS API
    // return await biometricAuth()

    // Demo: simulate a 1.5-second unlock
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
    <div className="flex flex-col items-center gap-8">
      {/* macOS variant */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-medium text-muted-foreground">
          macOS (Touch ID)
        </p>
        <UnlockWallet
          platform="macos"
          appName="BigBlocks Wallet"
          onUnlock={handleUnlock}
          onSuccess={() => console.log("Wallet unlocked via Touch ID")}
          onError={(error) => console.error("Unlock error:", error)}
        />
      </div>

      {/* Passphrase variant */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-medium text-muted-foreground">
          Passphrase
        </p>
        <UnlockWallet
          platform="other"
          appName="BigBlocks Wallet"
          onUnlock={handleUnlock}
          onSuccess={() => console.log("Wallet unlocked via passphrase")}
          onError={(error) => console.error("Unlock error:", error)}
        />
      </div>
    </div>
  )
}
