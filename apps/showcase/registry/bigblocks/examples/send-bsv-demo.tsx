"use client"

import { useState } from "react"
import {
  SendBsv,
  type SendBsvParams,
  type SendBsvResult,
} from "@/registry/bigblocks/blocks/send-bsv"

export default function SendBsvDemo() {
  const [lastResult, setLastResult] = useState<SendBsvResult | null>(null)

  async function handleSend(params: SendBsvParams): Promise<SendBsvResult> {
    // In a real application, use @1sat/actions:
    //
    // import { sendBsv, createContext } from "@1sat/actions"
    // import { useWallet } from "@1sat/react"
    //
    // const { wallet } = useWallet()
    // const ctx = createContext(wallet)
    // const result = await sendBsv.execute(ctx, {
    //   requests: [{ address: params.address, satoshis: params.satoshis }],
    // })
    // return result

    // Demo: simulate a 2-second transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      txid: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    }
  }

  return (
    <div className="flex flex-col items-start gap-8">
      {/* Default trigger */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">Default</p>
        <SendBsv
          onSend={handleSend}
          onSuccess={(result) => setLastResult(result)}
          onError={(error) => console.error("Send error:", error)}
        />
      </div>

      {/* Compact trigger */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">Compact</p>
        <SendBsv
          variant="compact"
          dialogSize="compact"
          onSend={handleSend}
          onSuccess={(result) => setLastResult(result)}
        />
      </div>

      {/* Quick trigger */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">Quick</p>
        <SendBsv
          variant="quick"
          onSend={handleSend}
          onSuccess={(result) => setLastResult(result)}
        />
      </div>

      {/* Last result display */}
      {lastResult?.txid && (
        <div className="w-full max-w-sm rounded-md border bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Last transaction</p>
          <p className="mt-1 break-all font-mono text-xs">
            {lastResult.txid}
          </p>
        </div>
      )}
    </div>
  )
}
