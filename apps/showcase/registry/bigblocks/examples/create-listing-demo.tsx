"use client"

import { useState } from "react"
import {
  CreateListing,
  type ListOrdinalParams,
  type ListOrdinalResult,
  type OrdinalItem,
} from "@/registry/bigblocks/blocks/create-listing"

const SAMPLE_ORDINAL: OrdinalItem = {
  outpoint:
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855.0",
  name: "Rare Pepe #42",
  contentType: "image/png",
  origin:
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855.0",
}

export default function CreateListingDemo() {
  const [lastResult, setLastResult] = useState<ListOrdinalResult | null>(null)

  async function handleList(
    params: ListOrdinalParams,
  ): Promise<ListOrdinalResult> {
    // In a real application, you would use the @1sat/actions listOrdinal action:
    //
    // import { listOrdinal } from "@1sat/actions"
    //
    // const result = await listOrdinal.execute(ctx, {
    //   ordinal: walletOutput,
    //   price: params.price,
    //   payAddress: params.payAddress,
    // })
    //
    // return result

    // Demo: simulate a 2-second listing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      txid: "f4a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <CreateListing
          ordinal={SAMPLE_ORDINAL}
          onList={handleList}
          onListed={(result) => setLastResult(result)}
          onError={(error) => console.error("Listing error:", error)}
          defaultPayAddress="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        />
        <CreateListing
          variant="primary"
          ordinal={SAMPLE_ORDINAL}
          onList={handleList}
          onListed={(result) => setLastResult(result)}
          onError={(error) => console.error("Listing error:", error)}
          defaultPayAddress="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
          triggerLabel="Sell Now"
        />
        <CreateListing
          variant="ghost"
          ordinal={SAMPLE_ORDINAL}
          onList={handleList}
          onListed={(result) => setLastResult(result)}
          onError={(error) => console.error("Listing error:", error)}
          defaultPayAddress="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
          triggerLabel="List"
        />
      </div>

      {lastResult?.txid && (
        <p className="text-sm text-muted-foreground">
          Last listing txid: {lastResult.txid.slice(0, 12)}...
        </p>
      )}
    </div>
  )
}
