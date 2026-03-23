"use client"

import {
  LockBsv,
  type LockOperationResult,
} from "@/registry/bigblocks/blocks/lock-bsv"

export default function LockBsvEmptyDemo() {
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
    <LockBsv
      onLock={handleLock}
      onUnlock={handleUnlock}
      onSuccess={(result) => console.log("txid:", result.txid)}
    />
  )
}
