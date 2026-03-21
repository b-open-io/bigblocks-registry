"use client"

import { PostButton } from "@/registry/new-york/blocks/post-button"

/** Simulates an on-chain post broadcast with a short delay. */
async function mockPost(content: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    txid: `${Math.random().toString(36).slice(2, 10)}...${Math.random().toString(36).slice(2, 6)}`,
  }
}

export default function PostButtonDemo() {
  return (
    <div className="flex flex-col items-start gap-6">
      {/* Default variant */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">Default</p>
        <PostButton variant="default" onPost={mockPost} />
      </div>

      {/* Compact variant */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">Compact</p>
        <PostButton variant="compact" onPost={mockPost} />
      </div>

      {/* Inline variant */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">Inline</p>
        <PostButton variant="inline" label="Write" onPost={mockPost} />
      </div>

      {/* With character limit */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          With 280-char limit
        </p>
        <PostButton
          variant="default"
          label="Tweet"
          maxLength={280}
          onPost={mockPost}
        />
      </div>

      {/* FAB variant (shown inline for demo) */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          FAB (floating action button)
        </p>
        <div className="relative h-20 w-20">
          <PostButton
            variant="fab"
            onPost={mockPost}
            className="absolute bottom-2 right-2 position-static"
          />
        </div>
      </div>
    </div>
  )
}
