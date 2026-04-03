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
      "1611d956f397caa80b56bc148b4bce87b54f39b234aeca4668b4d5a7785eb9fa_0",
    price: 50000,
    name: "Pixel Fox #42",
    seller: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    contentType: "image/png",
  },
  {
    outpoint:
      "3265e1cfee59754a6e9e3e473fc8dbbf7bf0ebb7a50d97d00c0870fb27b934b2_0",
    price: 150000,
    name: "SNOW",
    seller: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    contentType: "image/jpeg",
  },
  {
    outpoint:
      "87459ead23591c06e2e06de62051e2265c6697dad8647d0aaba4933265ad5dba_0",
    price: 250000,
    name: "Crypto Adventure",
    seller: "15Cytz9MVSxwYpYo1hNCqVwnqPi2GCaWCi",
    contentType: "image/webp",
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
      txid: "f1f82b4f815e8b4fd49c43bc471d60d93943f514ca20047939bb789cd067a933",
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
