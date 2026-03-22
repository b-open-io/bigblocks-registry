"use client"

import {
  SendBsv,
  type SendBsvParams,
  type SendBsvResult,
} from "@/registry/bigblocks/blocks/send-bsv"

export default function SendBsvQuickDemo() {
  async function handleSend(_params: SendBsvParams): Promise<SendBsvResult> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return {
      txid: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    }
  }

  return (
    <div className="flex items-center justify-center">
      <SendBsv
        variant="quick"
        onSend={handleSend}
      />
    </div>
  )
}
