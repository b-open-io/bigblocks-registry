"use client"

import { useState } from "react"
import {
  LockBsv,
  type LockOperationResult,
} from "@/registry/bigblocks/blocks/lock-bsv"

export default function LockBsvDemo() {
  const [lastResult, setLastResult] = useState<LockOperationResult | null>(null)

  async function handleLock(params: {
    satoshis: number
    until: number
  }): Promise<LockOperationResult> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return {
      txid: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    }
  }

  async function handleUnlock(): Promise<LockOperationResult> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return {
      txid: "f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5",
    }
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <LockBsv
        lockData={{
          totalLocked: 5000000,
          unlockable: 1500000,
          nextUnlock: 892450,
        }}
        onLock={handleLock}
        onUnlock={handleUnlock}
        onSuccess={(result) => setLastResult(result)}
        onError={(error) => console.error("Lock error:", error)}
      />

      {lastResult?.txid && (
        <div className="w-full max-w-md rounded-md border bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Last transaction</p>
          <p className="mt-1 break-all font-mono text-xs">{lastResult.txid}</p>
        </div>
      )}
    </div>
  )
}
