"use client"

import { FriendButton } from "@/registry/bigblocks/blocks/friend-button"

const SAMPLE_IDENTITY = "02a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"

async function mockAction(_id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return {
    txid: `${Math.random().toString(36).slice(2, 10)}...${Math.random().toString(36).slice(2, 6)}`,
  }
}

export default function FriendButtonPendingDemo() {
  return (
    <div className="flex items-center justify-center">
      <FriendButton
        identityKey={SAMPLE_IDENTITY}
        status="pending-sent"
        onAddFriend={mockAction}
      />
    </div>
  )
}
