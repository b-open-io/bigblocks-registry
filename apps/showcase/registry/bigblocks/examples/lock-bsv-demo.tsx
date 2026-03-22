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
    // In a real application, use @1sat/actions:
    //
    // import { lockBsv, createContext } from "@1sat/actions"
    // import { useWallet } from "@1sat/react"
    //
    // const { wallet } = useWallet()
    // const ctx = createContext(wallet)
    // return lockBsv.execute(ctx, { requests: [params] })

    // Demo: simulate a 2-second lock transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      txid: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    }
  }

  async function handleUnlock(): Promise<LockOperationResult> {
    // In a real application, use @1sat/actions:
    //
    // import { unlockBsv, createContext } from "@1sat/actions"
    // const ctx = createContext(wallet)
    // return unlockBsv.execute(ctx)

    // Demo: simulate a 2-second unlock transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      txid: "f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5",
    }
  }

  return (
    <div className="flex flex-col items-start gap-8">
      {/* With existing locks and unlockable amount */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          With Existing Locks
        </p>
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
      </div>

      {/* Empty state - no locks */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          No Existing Locks
        </p>
        <LockBsv
          onLock={handleLock}
          onUnlock={handleUnlock}
          onSuccess={(result) => setLastResult(result)}
        />
      </div>

      {/* Last result display */}
      {lastResult?.txid && (
        <div className="w-full max-w-md rounded-md border bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Last transaction</p>
          <p className="mt-1 break-all font-mono text-xs">{lastResult.txid}</p>
        </div>
      )}
    </div>
  )
}
