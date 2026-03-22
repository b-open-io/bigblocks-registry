"use client"

import {
  TokenListUI,
  type TokenHolding,
} from "@/registry/bigblocks/blocks/token-list"

const MOCK_TOKENS: TokenHolding[] = [
  {
    tokenId: "e6d40ba206340aa94ed40fe1a8adcd722c08c9438b2c1dd0da1ddc2d11af5c49_0",
    symbol: "VIBES",
    type: "BSV21",
    balance: "5000000000",
    decimals: 8,
    iconUrl: null,
  },
  {
    tokenId: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2_0",
    symbol: "PEPE",
    type: "BSV21",
    balance: "42000000",
    decimals: 4,
    iconUrl: null,
  },
]

export default function TokenListDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <TokenListUI
        tokens={MOCK_TOKENS}
        isLoading={false}
        error={null}
        onSelect={(token) => console.log("Selected", token.symbol)}
      />
    </div>
  )
}
