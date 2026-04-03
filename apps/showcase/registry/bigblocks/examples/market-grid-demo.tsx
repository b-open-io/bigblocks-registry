"use client"

import { useCallback, useState } from "react"
import { MarketGridUI } from "@/registry/bigblocks/blocks/market-grid/market-grid-ui"
import type { MarketListing } from "@/registry/bigblocks/blocks/market-grid/use-market-grid"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_LISTINGS: MarketListing[] = [
  {
    outpoint:
      "1611d956f397caa80b56bc148b4bce87b54f39b234aeca4668b4d5a7785eb9fa_0",
    price: 50000,
    seller: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    contentType: "image/png",
    origin:
      "1611d956f397caa80b56bc148b4bce87b54f39b234aeca4668b4d5a7785eb9fa_0",
    name: "Pixel Foxes",
  },
  {
    outpoint:
      "87459ead23591c06e2e06de62051e2265c6697dad8647d0aaba4933265ad5dba_0",
    price: 125000,
    seller: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    contentType: "image/webp",
    origin:
      "87459ead23591c06e2e06de62051e2265c6697dad8647d0aaba4933265ad5dba_0",
    name: "Crypto Adventure",
  },
  {
    outpoint:
      "94f664c15f3f8a5f2930a053381b4b94e264c77434cd99b49b03734f7862bc6e_0",
    price: 1000000,
    seller: "15Cytz9MVSxwYpYo1hNCqVwnqPi2GCaWCi",
    contentType: "image/jpeg",
    origin:
      "94f664c15f3f8a5f2930a053381b4b94e264c77434cd99b49b03734f7862bc6e_0",
    name: "The Pepeverse",
  },
  {
    outpoint:
      "6d2b430030ab8480a430a300e0393d107b3754bce4d98bf919c39f0e752b6746_0",
    price: 300,
    seller: "1dice8EMZmqKvrGE4Qc9bUFf9PX3xaYDp",
    contentType: "image/png",
    origin:
      "0d2b430030ab8480a430a300e0393d107b3754bce4d98bf919c39f0e752b6746_0",
    name: "TestyPepes",
  },
  {
    outpoint:
      "65b7ccfffc6b4dacc2b30ddbd7bd016c0cffe1026f3245829e030542fa5a4fe9_0",
    price: 7500000,
    seller: "1JArS6jzE3AJ9sZ3aFij1BmTcpFGgN86hA",
    contentType: "image/jpeg",
    origin:
      "65b7ccfffc6b4dacc2b30ddbd7bd016c0cffe1026f3245829e030542fa5a4fe9_0",
    name: "Satoshi Sparks",
  },
  {
    outpoint:
      "6352cd99e4df66f727175b71da91f0bf0276cd4541ab6cb213126ea22c7f8f61_0",
    price: 25000,
    seller: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    contentType: "image/jpeg",
    origin:
      "6352cd99e4df66f727175b71da91f0bf0276cd4541ab6cb213126ea22c7f8f61_0",
    name: "Magic Mushrooms",
  },
]

// ---------------------------------------------------------------------------
// Demo component
// ---------------------------------------------------------------------------

export default function MarketGridDemo() {
  const [bought, setBought] = useState<Set<string>>(new Set())

  const handleBuy = useCallback((outpoint: string, price: number) => {
    // In a real app, use @1sat/actions purchaseOrdinal:
    //
    // import { purchaseOrdinal } from "@1sat/actions"
    // const result = await purchaseOrdinal.execute(ctx, { outpoint })
    //
    // Demo: just log and mark purchased
    console.log(`Buy ${outpoint} for ${price.toLocaleString()} sats`)
    setBought((prev) => new Set(prev).add(outpoint))
  }, [])

  const handleListingClick = useCallback((outpoint: string) => {
    console.log(`Navigate to listing: ${outpoint}`)
  }, [])

  return (
    <MarketGridUI
      listings={MOCK_LISTINGS}
      isLoading={false}
      isLoadingMore={false}
      error={null}
      hasMore={false}
      onLoadMore={() => {}}
      onRefresh={() => {}}
      onBuy={handleBuy}
      onListingClick={handleListingClick}
    />
  )
}
