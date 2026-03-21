"use client"

import { useState } from "react"
import {
  BuyListing,
  type PurchaseOrdinalParams,
  type PurchaseOrdinalResult,
} from "@/registry/new-york/blocks/buy-listing"

const SAMPLE_LISTINGS = [
  {
    outpoint:
      "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2.0",
    price: 50000,
    name: "Rare Pepe #42",
    seller: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    contentType: "image/png",
  },
  {
    outpoint:
      "b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2.0",
    price: 125000,
    name: "1Sat Punk #1337",
    seller: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    contentType: "image/webp",
  },
  {
    outpoint:
      "c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3.0",
    price: 1000000,
    name: "Genesis Block Art",
    seller: "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
    contentType: "image/svg+xml",
  },
]

export default function BuyListingDemo() {
  const [purchased, setPurchased] = useState<Set<string>>(new Set())

  async function handlePurchase(
    params: PurchaseOrdinalParams,
  ): Promise<PurchaseOrdinalResult> {
    // In a real application, you would use the @1sat/actions purchaseOrdinal action:
    //
    // import { purchaseOrdinal } from "@1sat/actions"
    //
    // const result = await purchaseOrdinal.execute(ctx, {
    //   outpoint: params.outpoint,
    //   marketplaceAddress: params.marketplaceAddress,
    //   marketplaceRate: params.marketplaceRate,
    // })
    //
    // return result

    // Demo: simulate a 2-second purchase
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      txid: "d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5",
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SAMPLE_LISTINGS.map((listing) => (
        <BuyListing
          key={listing.outpoint}
          outpoint={listing.outpoint}
          price={listing.price}
          name={listing.name}
          seller={listing.seller}
          contentType={listing.contentType}
          onPurchase={handlePurchase}
          onPurchased={(result) => {
            if (result.txid) {
              setPurchased((prev) => new Set(prev).add(listing.outpoint))
            }
          }}
          onError={(error) => console.error("Purchase error:", error)}
          marketplaceAddress="1MarketplaceXXXXXXXXXXXXXXXXXXXYhYb"
          marketplaceRate={0.04}
        />
      ))}
    </div>
  )
}
