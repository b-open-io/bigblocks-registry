"use client"

import { useState } from "react"
import {
  InscribeFile,
  type InscribeParams,
  type InscribeResult,
} from "@/registry/new-york/blocks/inscribe-file"

export default function InscribeFileDemo() {
  const [lastResult, setLastResult] = useState<InscribeResult | null>(null)

  async function handleInscribe(params: InscribeParams): Promise<InscribeResult> {
    // In a real application, you would dispatch based on params.type:
    //
    // if (params.type === "file") {
    //   return await inscribe.execute(ctx, {
    //     base64Content: params.base64Content,
    //     contentType: params.contentType,
    //     map: params.map,
    //     signWithBAP: params.signWithBAP,
    //   })
    // }
    //
    // if (params.type === "bsv20") {
    //   const { mode, ticker, amount, maxSupply, mintLimit, decimals } = params.bsv20!
    //   // handle BSV20 mint or deploy...
    // }
    //
    // if (params.type === "bsv21") {
    //   const { symbol, maxSupply, decimals, iconBase64 } = params.bsv21!
    //   // handle BSV21 deploy...
    // }

    // Demo: simulate a 2-second inscription
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      txid: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <InscribeFile
        onInscribe={handleInscribe}
        onSuccess={(result) => setLastResult(result)}
        onError={(error) => console.error("Inscription error:", error)}
      />
    </div>
  )
}
