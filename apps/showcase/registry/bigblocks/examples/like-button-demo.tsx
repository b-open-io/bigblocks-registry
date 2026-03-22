"use client"

import { LikeButton } from "@/registry/bigblocks/blocks/like-button"

const SAMPLE_TXID = "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"

/** Simulates an on-chain like/unlike action with a short delay. */
async function mockLike(_txid: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return {
    txid: `${Math.random().toString(36).slice(2, 10)}...${Math.random().toString(36).slice(2, 6)}`,
  }
}

export default function LikeButtonDemo() {
  return (
    <div className="flex flex-col items-start gap-6">
      {/* Default variant — not liked */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Default (not liked)
        </p>
        <LikeButton
          txid={SAMPLE_TXID}
          count={12}
          liked={false}
          onLike={mockLike}
          onUnlike={mockLike}
        />
      </div>

      {/* Default variant — already liked */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Default (liked)
        </p>
        <LikeButton
          txid={SAMPLE_TXID}
          count={43}
          liked={true}
          onLike={mockLike}
          onUnlike={mockLike}
        />
      </div>

      {/* Compact variant */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">Compact</p>
        <LikeButton
          variant="compact"
          txid={SAMPLE_TXID}
          count={7}
          liked={false}
          onLike={mockLike}
          onUnlike={mockLike}
        />
      </div>

      {/* Text variant */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">Text</p>
        <LikeButton
          variant="text"
          txid={SAMPLE_TXID}
          count={99}
          liked={false}
          onLike={mockLike}
          onUnlike={mockLike}
        />
      </div>

      {/* Thumbs-up icon */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Thumbs-up icon
        </p>
        <LikeButton
          txid={SAMPLE_TXID}
          count={5}
          liked={false}
          useThumbsUp
          onLike={mockLike}
          onUnlike={mockLike}
        />
      </div>
    </div>
  )
}
