"use client"

import { BitcoinAvatar } from "@/registry/bigblocks/blocks/bitcoin-avatar"

const SATOSHI_ADDRESS = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
const SECOND_ADDRESS = "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
const THIRD_ADDRESS = "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"

const variants = [
  { address: SATOSHI_ADDRESS, variant: "marble" as const },
  { address: SECOND_ADDRESS, variant: "pixel" as const },
  { address: THIRD_ADDRESS, variant: "beam" as const },
  { address: SATOSHI_ADDRESS, variant: "ring" as const },
  { address: SECOND_ADDRESS, variant: "sunset" as const },
  { address: THIRD_ADDRESS, variant: "bauhaus" as const },
  { address: SATOSHI_ADDRESS, variant: "fractal" as const },
  { address: SECOND_ADDRESS, variant: "mage" as const },
  { address: THIRD_ADDRESS, variant: "barcode" as const },
  { address: SATOSHI_ADDRESS, variant: "pepe" as const },
]

export default function BitcoinAvatarVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {variants.map(({ address, variant }) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <BitcoinAvatar address={address} size="lg" variant={variant} />
          <span className="text-xs text-muted-foreground">{variant}</span>
        </div>
      ))}
    </div>
  )
}
