"use client"

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

export default function CreateListingPrimaryDemo() {
  async function handleList(
    params: ListOrdinalParams,
  ): Promise<ListOrdinalResult> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return {
      txid: "f4a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
    }
  }

  return (
    <div className="flex items-center justify-center">
      <CreateListing
        variant="primary"
        ordinal={SAMPLE_ORDINAL}
        onList={handleList}
        onListed={(result) => console.log("Listed:", result.txid)}
        onError={(error) => console.error("Listing error:", error)}
        defaultPayAddress="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        triggerLabel="Sell Now"
      />
    </div>
  )
}
