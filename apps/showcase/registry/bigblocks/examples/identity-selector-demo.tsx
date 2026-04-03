"use client"

import { useState } from "react"
import { IdentitySelector } from "@/registry/bigblocks/blocks/identity-selector"
import type { IdentityEntry } from "@/registry/bigblocks/blocks/identity-selector/use-identity-selector"

const MOCK_IDENTITIES: IdentityEntry[] = [
  {
    bapId: "Go8vCHAa4S6AhXKdRp3nT9wJm",
    name: "Satoshi Nakamoto",
    currentAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    imageUrl: "https://ordfs.network/content/1611d956f397caa80b56bc148b4bce87b54f39b234aeca4668b4d5a7785eb9fa_0",
  },
  {
    bapId: "Hk9wBCDe5F7AiYLmNp2qR8xTs",
    name: "Hal Finney",
    currentAddress: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    imageUrl: "https://ordfs.network/content/6d2d46d93bfbc93c13db2b44c98aa9063ed53da268607df6b8e77e705dfc78eb_0",
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
