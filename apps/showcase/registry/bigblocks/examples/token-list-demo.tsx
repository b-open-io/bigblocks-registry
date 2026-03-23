"use client"

import { useState } from "react"
import {
  TokenListUI,
  type TokenHolding,
} from "@/registry/bigblocks/blocks/token-list"

const MOCK_TOKENS: TokenHolding[] = [
  {
    tokenId:
      "e6d40ba206340aa94ed40fe1a8adcd722c08c9438b2c1dd0da1ddc2d11af5c49_0",
    symbol: "VIBES",
    type: "BSV21",
    balance: "5000000000",
    decimals: 8,
    iconUrl: null,
  },
  {
    tokenId:
      "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2_0",
    symbol: "PEPE",
    type: "BSV21",
    balance: "42000000",
    decimals: 4,
    iconUrl: null,
  },
  {
    tokenId:
      "b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3_0",
    symbol: "GOLD",
    type: "BSV20",
    balance: "100",
    decimals: 0,
    iconUrl: null,
  },
  {
    tokenId:
      "c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4_0",
    symbol: "SATS",
    type: "BSV21",
    balance: "2100000000000000",
    decimals: 8,
    iconUrl: null,
  },
]

export default function TokenListDemo() {
  const [selected, setSelected] = useState<TokenHolding | null>(null)

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <TokenListUI
        tokens={MOCK_TOKENS}
        isLoading={false}
        error={null}
        onSelect={setSelected}
      />

      {selected && (
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          <span className="font-semibold text-foreground">
            {selected.symbol}
          </span>
        </p>
      )}
    </div>
  )
}
