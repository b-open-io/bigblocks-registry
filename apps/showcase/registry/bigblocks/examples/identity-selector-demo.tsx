"use client"

import { useState } from "react"
import { IdentitySelector } from "@/registry/bigblocks/blocks/identity-selector"
import type { IdentityEntry } from "@/registry/bigblocks/blocks/identity-selector/use-identity-selector"

const MOCK_IDENTITIES: IdentityEntry[] = [
  {
    bapId: "Go8vCHAa4S6AhXKdRp3nT9wJm",
    name: "Satoshi Nakamoto",
    currentAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    imageUrl: null,
  },
  {
    bapId: "Hk9wBCDe5F7AiYLmNp2qR8xTs",
    name: "Hal Finney",
    currentAddress: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    imageUrl: null,
  },
]

export default function IdentitySelectorDemo() {
  const [activeBapId, setActiveBapId] = useState(MOCK_IDENTITIES[0].bapId)

  return (
    <IdentitySelector
      identities={MOCK_IDENTITIES}
      activeBapId={activeBapId}
      onSelect={(bapId) => setActiveBapId(bapId)}
      onAddIdentity={() => {}}
    />
  )
}
