"use client"

import { PostButton } from "@/registry/bigblocks/blocks/post-button"

async function mockPost(_content: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    txid: `${Math.random().toString(36).slice(2, 10)}...${Math.random().toString(36).slice(2, 6)}`,
  }
}

export default function PostButtonInlineDemo() {
  return (
    <div className="flex items-center justify-center">
      <PostButton variant="inline" label="Write" onPost={mockPost} />
    </div>
  )
}
