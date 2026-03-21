"use client"

import { FollowButton } from "@/registry/new-york/blocks/follow-button"

const SAMPLE_BAP_ID = "02a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"

/** Simulates an on-chain follow/unfollow action with a short delay. */
async function mockFollow(_bapId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    txid: `${Math.random().toString(36).slice(2, 10)}...${Math.random().toString(36).slice(2, 6)}`,
  }
}

export default function FollowButtonDemo() {
  return (
    <div className="flex flex-col items-start gap-6">
      {/* Default — not following */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Default (not following)
        </p>
        <FollowButton
          bapId={SAMPLE_BAP_ID}
          isFollowing={false}
          onFollow={mockFollow}
          onUnfollow={mockFollow}
        />
      </div>

      {/* Default — already following (hover to see unfollow) */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Default (following — hover to unfollow)
        </p>
        <FollowButton
          bapId={SAMPLE_BAP_ID}
          isFollowing={true}
          onFollow={mockFollow}
          onUnfollow={mockFollow}
        />
      </div>

      {/* Compact variant */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">Compact</p>
        <FollowButton
          variant="compact"
          bapId={SAMPLE_BAP_ID}
          isFollowing={false}
          onFollow={mockFollow}
          onUnfollow={mockFollow}
        />
      </div>

      {/* Pill variant */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">Pill</p>
        <FollowButton
          variant="pill"
          bapId={SAMPLE_BAP_ID}
          isFollowing={false}
          onFollow={mockFollow}
          onUnfollow={mockFollow}
        />
      </div>

      {/* Custom labels */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Custom labels
        </p>
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
