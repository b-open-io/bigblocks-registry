"use client"

import { useState } from "react"
import {
  DeployToken,
  type DeployTokenParams,
  type DeployTokenResult,
} from "@/registry/new-york/blocks/deploy-token"

export default function DeployTokenDemo() {
  const [lastResult, setLastResult] = useState<DeployTokenResult | null>(null)

  async function handleDeploy(
    params: DeployTokenParams
  ): Promise<DeployTokenResult> {
    // In a real application, you would call deployBsv21Token from @1sat/core:
    //
    // import { deployBsv21Token } from "@1sat/core"
    //
    // const tx = await deployBsv21Token({
    //   symbol: params.symbol,
    //   decimals: params.decimals,
    //   icon: { dataB64: params.iconBase64, contentType: params.iconContentType },
    //   initialDistribution: {
    //     address: myAddress,
    //     tokens: Number(params.maxSupply),
    //   },
    //   destinationAddress: myAddress,
    //   utxos: paymentUtxos,
    // })
    //
    // return { txid: tx.id("hex") }

    // Demo: simulate a 2-second deployment
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      txid: "f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2",
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <DeployToken
        onDeploy={handleDeploy}
        onSuccess={(result) => setLastResult(result)}
        onError={(error) => console.error("Deploy error:", error)}
      />
    </div>
  )
}
