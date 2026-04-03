"use client"

import {
  CreateListing,
  type ListOrdinalParams,
  type ListOrdinalResult,
  type OrdinalItem,
} from "@/registry/bigblocks/blocks/create-listing"

const SAMPLE_ORDINAL: OrdinalItem = {
  outpoint:
    "1611d956f397caa80b56bc148b4bce87b54f39b234aeca4668b4d5a7785eb9fa_0",
  name: "Pixel Fox #42",
  contentType: "image/png",
  origin:
    "1611d956f397caa80b56bc148b4bce87b54f39b234aeca4668b4d5a7785eb9fa_0",
}

export default function CreateListingGhostDemo() {
  async function handleList(
    params: ListOrdinalParams,
  ): Promise<ListOrdinalResult> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return {
      txid: "d4d9f56ac42133771a01e116c99ea5f116a3f0fd07d1a616ebefec8b9cc67551",
    }
  }

  return (
    <div className="flex items-center justify-center">
      <CreateListing
        variant="ghost"
        ordinal={SAMPLE_ORDINAL}
        onList={handleList}
        onListed={(result) => console.log("Listed:", result.txid)}
        onError={(error) => console.error("Listing error:", error)}
        defaultPayAddress="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        triggerLabel="List"
      />
    </div>
  )
}
