"use client"

import { useState } from "react"
import { IdentitySelector } from "@/registry/new-york/blocks/identity-selector"
import { IdentitySelectorUI } from "@/registry/new-york/blocks/identity-selector/identity-selector-ui"
import type { IdentityEntry } from "@/registry/new-york/blocks/identity-selector/use-identity-selector"

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
  {
    bapId: "Jm3xDEFg6H8BiZKnOq4sT9yVw",
    name: null,
    currentAddress: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
    imageUrl: null,
  },
]

export default function IdentitySelectorDemo() {
  const [activeBapId, setActiveBapId] = useState(MOCK_IDENTITIES[0].bapId)

  return (
    <div className="space-y-8">
      {/* Interactive selector */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Interactive selector</p>
        <IdentitySelector
          identities={MOCK_IDENTITIES}
          activeBapId={activeBapId}
          onSelect={(bapId) => setActiveBapId(bapId)}
          onAddIdentity={() => {}}
        />
        <p className="text-xs text-muted-foreground">
          Active: {activeBapId}
        </p>
      </div>

      {/* Loading state */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Loading state</p>
        <IdentitySelectorUI
          identities={[]}
          activeBapId={null}
          isLoading={true}
          error={null}
          onSelect={() => {}}
          onAddIdentity={() => {}}
        />
      </div>

      {/* Without add button */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Without &ldquo;Add identity&rdquo;</p>
        <IdentitySelector
          identities={MOCK_IDENTITIES.slice(0, 2)}
          activeBapId={MOCK_IDENTITIES[0].bapId}
          onSelect={() => {}}
          showAddIdentity={false}
        />
      </div>

      {/* Error state */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Error state</p>
        <IdentitySelectorUI
          identities={[]}
          activeBapId={null}
          isLoading={false}
          error={new Error("Failed to load identities")}
          onSelect={() => {}}
          onAddIdentity={() => {}}
        />
      </div>
    </div>
  )
}
