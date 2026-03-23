"use client"

import {
  TokenListUI,
} from "@/registry/bigblocks/blocks/token-list"

export default function TokenListLoadingDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <TokenListUI tokens={[]} isLoading={true} error={null} />
    </div>
  )
}
