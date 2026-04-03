"use client"

import { useState } from "react"
import {
  CreateListing,
  type ListOrdinalParams,
  type ListOrdinalResult,
  type OrdinalItem,
} from "@/registry/new-york/blocks/create-listing"

const SAMPLE_ORDINAL: OrdinalItem = {
  outpoint:
    "1611d956f397caa80b56bc148b4bce87b54f39b234aeca4668b4d5a7785eb9fa_0",
  name: "Pixel Fox #42",
  contentType: "image/png",
  origin:
    "1611d956f397caa80b56bc148b4bce87b54f39b234aeca4668b4d5a7785eb9fa_0",
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
      txid: "d4d9f56ac42133771a01e116c99ea5f116a3f0fd07d1a616ebefec8b9cc67551",
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
