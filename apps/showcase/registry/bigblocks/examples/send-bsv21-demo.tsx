"use client"

import { useState } from "react"
import {
  SendBsv21,
  type SendBsv21Params,
  type SendBsv21Result,
  type TokenBalance,
} from "@/registry/bigblocks/blocks/send-bsv21"

const MOCK_BALANCES: TokenBalance[] = [
  {
    tokenId: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2_0",
    symbol: "PEPE",
    balance: "100000000",
    decimals: 4,
    iconUrl: "https://ordfs.network/content/a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2_0",
  },
  {
    tokenId: "b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3_0",
    symbol: "GOLD",
    balance: "5000000",
    decimals: 2,
  },
  {
    tokenId: "c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4_0",
    symbol: "SIGMA",
    balance: "999",
    decimals: 0,
  },
]

export default function SendBsv21Demo() {
  const [lastResult, setLastResult] = useState<SendBsv21Result | null>(null)

  async function handleSend(params: SendBsv21Params): Promise<SendBsv21Result> {
    // In a real application, use @1sat/actions:
    //
    // import { sendBsv21, createContext } from "@1sat/actions"
    // import { useWallet } from "@1sat/react"
    //
    // const { wallet } = useWallet()
    // const ctx = createContext(wallet)
    // const result = await sendBsv21.execute(ctx, {
    //   tokenId: params.tokenId,
    //   amount: params.amount,
    //   address: params.address,
    // })
    // return result

    // Demo: simulate a 2-second transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      txid: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <SendBsv21
        balances={MOCK_BALANCES}
        onSend={handleSend}
        onSuccess={(result) => setLastResult(result)}
        onError={(error) => console.error("Send token error:", error)}
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
