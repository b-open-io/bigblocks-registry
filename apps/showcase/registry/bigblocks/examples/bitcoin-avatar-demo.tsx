"use client"

import { BitcoinAvatar } from "@/registry/bigblocks/blocks/bitcoin-avatar"

const SATOSHI_ADDRESS = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"

export default function BitcoinAvatarDemo() {
  return (
    <div className="flex items-end justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <BitcoinAvatar address={SATOSHI_ADDRESS} size="sm" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BitcoinAvatar address={SATOSHI_ADDRESS} size="md" />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BitcoinAvatar address={SATOSHI_ADDRESS} size="lg" />
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BitcoinAvatar address={SATOSHI_ADDRESS} size="xl" />
        <span className="text-xs text-muted-foreground">xl</span>
      </div>
    </div>
  )
}
