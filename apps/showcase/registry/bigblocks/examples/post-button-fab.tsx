"use client"

import { PostButton } from "@/registry/bigblocks/blocks/post-button"

async function mockPost(_content: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    txid: `${Math.random().toString(36).slice(2, 10)}...${Math.random().toString(36).slice(2, 6)}`,
  }
}

export default function PostButtonFabDemo() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-14 w-14">
        <PostButton
          variant="fab"
          onPost={mockPost}
          className="absolute bottom-0 right-0 position-static"
        />
      </div>
    </div>
  )
}
