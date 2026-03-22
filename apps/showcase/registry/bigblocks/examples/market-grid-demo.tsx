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
      "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2.0",
    price: 50000,
    seller: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    contentType: "image/png",
    origin:
      "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2.0",
    name: "Rare Pepe #42",
  },
  {
    outpoint:
      "b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3.0",
    price: 125000,
    seller: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    contentType: "image/webp",
    origin:
      "b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3.0",
    name: "1Sat Punk #1337",
  },
  {
    outpoint:
      "c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4.0",
    price: 1000000,
    seller: "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
    contentType: "image/svg+xml",
    origin:
      "c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4.0",
    name: "Genesis Block Art",
  },
  {
    outpoint:
      "d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5.0",
    price: 300,
    seller: "1dice8EMZmqKvrGE4Qc9bUFf9PX3xaYDp",
    contentType: "image/jpeg",
    origin:
      "d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5.0",
    name: null,
  },
  {
    outpoint:
      "e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6.0",
    price: 7500000,
    seller: "15Cytz9MVSxwYpYo1hNCqVwnqPi2GCaWCi",
    contentType: "image/png",
    origin:
      "e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6.0",
    name: "Sigma Collection #7",
  },
  {
    outpoint:
      "f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1.0",
    price: 25000,
    seller: "1JArS6jzE3AJ9sZ3aFij1BmTcpFGgN86hA",
    contentType: "text/html",
    origin:
      "f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1.0",
    name: "On-Chain HTML #3",
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
