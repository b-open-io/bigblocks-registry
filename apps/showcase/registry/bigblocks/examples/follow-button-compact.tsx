"use client"

import { FollowButton } from "@/registry/bigblocks/blocks/follow-button"

const SAMPLE_BAP_ID = "02a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"

async function mockFollow(_bapId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    txid: `${Math.random().toString(36).slice(2, 10)}...${Math.random().toString(36).slice(2, 6)}`,
  }
}

export default function FollowButtonCompactDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <FollowButton
        variant="compact"
        bapId={SAMPLE_BAP_ID}
        isFollowing={false}
        onFollow={mockFollow}
        onUnfollow={mockFollow}
      />
      <FollowButton
        variant="pill"
        bapId={SAMPLE_BAP_ID}
        isFollowing={false}
        onFollow={mockFollow}
        onUnfollow={mockFollow}
      />
    </div>
  )
}
