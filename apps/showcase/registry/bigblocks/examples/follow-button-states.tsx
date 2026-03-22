"use client"

import { FollowButton } from "@/registry/bigblocks/blocks/follow-button"

const SAMPLE_BAP_ID = "02a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"

async function mockFollow(_bapId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    txid: `${Math.random().toString(36).slice(2, 10)}...${Math.random().toString(36).slice(2, 6)}`,
  }
}

export default function FollowButtonStatesDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground w-24">Following</span>
        <FollowButton
          bapId={SAMPLE_BAP_ID}
          isFollowing={true}
          onFollow={mockFollow}
          onUnfollow={mockFollow}
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground w-24">Custom labels</span>
        <FollowButton
          bapId={SAMPLE_BAP_ID}
          isFollowing={false}
          onFollow={mockFollow}
          onUnfollow={mockFollow}
          labels={{
            follow: "Subscribe",
            following: "Subscribed",
            unfollow: "Unsubscribe",
          }}
        />
      </div>
    </div>
  )
}
