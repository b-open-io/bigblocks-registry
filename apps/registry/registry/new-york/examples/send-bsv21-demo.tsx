"use client"

import { useState } from "react"
import {
  SendBsv21,
  type SendBsv21Params,
  type SendBsv21Result,
  type TokenBalance,
} from "@/registry/new-york/blocks/send-bsv21"

const MOCK_BALANCES: TokenBalance[] = [
  {
    tokenId: "6d2b430030ab8480a430a300e0393d107b3754bce4d98bf919c39f0e752b6746_0",
    symbol: "PEPE",
    balance: "100000000",
    decimals: 4,
    iconUrl: "https://ordfs.network/content/1611d956f397caa80b56bc148b4bce87b54f39b234aeca4668b4d5a7785eb9fa_0",
  },
  {
    tokenId: "ba11660cc3d3b71d196034e4ecf0e47aa2b90f362e9a36ead9df3bfa15bccb42_0",
    symbol: "GOLD",
    balance: "5000000",
    decimals: 2,
  },
  {
    tokenId: "d4d9f56ac42133771a01e116c99ea5f116a3f0fd07d1a616ebefec8b9cc67551_0",
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
      txid: "fb009b6083474453cea20a9b0186dc56361903125607178f725b43753d586d01",
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
