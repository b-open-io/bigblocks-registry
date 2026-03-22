"use client"

import { LikeButton } from "@/registry/bigblocks/blocks/like-button"

const SAMPLE_TXID = "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"

async function mockLike(_txid: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return {
    txid: `${Math.random().toString(36).slice(2, 10)}...${Math.random().toString(36).slice(2, 6)}`,
  }
}

export default function LikeButtonLikedDemo() {
  return (
    <div className="flex items-center justify-center">
      <LikeButton
        txid={SAMPLE_TXID}
        count={43}
        liked={true}
        onLike={mockLike}
        onUnlike={mockLike}
      />
    </div>
  )
}
