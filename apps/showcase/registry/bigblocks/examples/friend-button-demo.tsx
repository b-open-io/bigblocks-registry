"use client"

import { FriendButton } from "@/registry/bigblocks/blocks/friend-button"

const SAMPLE_IDENTITY = "02a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"

/** Simulates an on-chain friend action with a short delay. */
async function mockAction(_id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return {
    txid: `${Math.random().toString(36).slice(2, 10)}...${Math.random().toString(36).slice(2, 6)}`,
    friendPublicKey: "03f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2",
  }
}

export default function FriendButtonDemo() {
  return (
    <div className="flex flex-col items-start gap-6">
      {/* None: Add Friend */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Not friends
        </p>
        <FriendButton
          identityKey={SAMPLE_IDENTITY}
          status="none"
          onAddFriend={mockAction}
          onAccept={mockAction}
          onDecline={mockAction}
          onRemove={mockAction}
        />
      </div>

      {/* Pending Sent */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Pending (sent)
        </p>
        <FriendButton
          identityKey={SAMPLE_IDENTITY}
          status="pending-sent"
          onAddFriend={mockAction}
        />
      </div>

      {/* Pending Received: Accept + Decline */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Pending (received)
        </p>
        <FriendButton
          identityKey={SAMPLE_IDENTITY}
          status="pending-received"
          onAddFriend={mockAction}
          onAccept={mockAction}
          onDecline={mockAction}
        />
      </div>

      {/* Friends (hover to see Remove) */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Friends (hover to remove)
        </p>
        <FriendButton
          identityKey={SAMPLE_IDENTITY}
          status="friends"
          onAddFriend={mockAction}
          onRemove={mockAction}
        />
      </div>

      {/* Compact variant */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          Compact variant
        </p>
        <FriendButton
          variant="compact"
          identityKey={SAMPLE_IDENTITY}
          status="none"
          onAddFriend={mockAction}
          onAccept={mockAction}
        />
      </div>
    </div>
  )
}
