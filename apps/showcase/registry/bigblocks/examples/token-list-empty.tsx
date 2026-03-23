"use client"

import {
  TokenListUI,
} from "@/registry/bigblocks/blocks/token-list"

export default function TokenListEmptyDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <TokenListUI tokens={[]} isLoading={false} error={null} />
    </div>
  )
}
