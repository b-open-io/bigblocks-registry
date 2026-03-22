"use client"

import { BitcoinAvatar } from "@/registry/bigblocks/blocks/bitcoin-avatar"

const SATOSHI_ADDRESS = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
const SECOND_ADDRESS = "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
const THIRD_ADDRESS = "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"

export default function BitcoinAvatarDemo() {
  return (
    <div className="space-y-8">
      {/* Size variants */}
      <div>
        <p className="text-sm font-medium mb-3">Sizes</p>
        <div className="flex items-end gap-6">
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
      </div>

      {/* Variant styles */}
      <div>
        <p className="text-sm font-medium mb-3">Variants</p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <BitcoinAvatar address={SATOSHI_ADDRESS} size="lg" variant="marble" />
            <span className="text-xs text-muted-foreground">marble</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BitcoinAvatar address={SECOND_ADDRESS} size="lg" variant="pixel" />
            <span className="text-xs text-muted-foreground">pixel</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BitcoinAvatar address={THIRD_ADDRESS} size="lg" variant="beam" />
            <span className="text-xs text-muted-foreground">beam</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BitcoinAvatar address={SATOSHI_ADDRESS} size="lg" variant="ring" />
            <span className="text-xs text-muted-foreground">ring</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BitcoinAvatar address={SECOND_ADDRESS} size="lg" variant="sunset" />
            <span className="text-xs text-muted-foreground">sunset</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BitcoinAvatar address={THIRD_ADDRESS} size="lg" variant="bauhaus" />
            <span className="text-xs text-muted-foreground">bauhaus</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BitcoinAvatar address={SATOSHI_ADDRESS} size="lg" variant="fractal" />
            <span className="text-xs text-muted-foreground">fractal</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BitcoinAvatar address={SECOND_ADDRESS} size="lg" variant="mage" />
            <span className="text-xs text-muted-foreground">mage</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BitcoinAvatar address={THIRD_ADDRESS} size="lg" variant="barcode" />
            <span className="text-xs text-muted-foreground">barcode</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BitcoinAvatar address={SATOSHI_ADDRESS} size="lg" variant="pepe" />
            <span className="text-xs text-muted-foreground">pepe</span>
          </div>
        </div>
      </div>

      {/* Deterministic - same address always produces same avatar */}
      <div>
        <p className="text-sm font-medium mb-3">Deterministic (same address = same avatar)</p>
        <div className="flex items-center gap-4">
          <BitcoinAvatar address={SATOSHI_ADDRESS} size="lg" />
          <BitcoinAvatar address={SATOSHI_ADDRESS} size="lg" />
          <BitcoinAvatar address={SATOSHI_ADDRESS} size="lg" />
        </div>
      </div>

      {/* With on-chain image URL */}
      <div>
        <p className="text-sm font-medium mb-3">With on-chain image (ord:// protocol)</p>
        <div className="flex items-center gap-4">
          <BitcoinAvatar
            address={SATOSHI_ADDRESS}
            imageUrl="ord://d4d03c2e7bf8ac27f1a6b6e0e92c6a33cfe90afee8a8deb12e076172f5705894_0"
            size="lg"
          />
          <BitcoinAvatar
            address={SECOND_ADDRESS}
            imageUrl="ord://invalid-should-fallback"
            size="lg"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Left: resolves on-chain image. Right: invalid URL falls back to deterministic avatar.
        </p>
      </div>
    </div>
  )
}
