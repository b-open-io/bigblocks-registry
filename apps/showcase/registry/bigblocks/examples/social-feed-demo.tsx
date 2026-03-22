"use client"

import { useState } from "react"
import {
  SocialFeedUI,
  type SocialPost,
} from "@/registry/bigblocks/blocks/social-feed"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_POSTS: SocialPost[] = [
  {
    txid: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
    content:
      "Just deployed my first BSV21 token on mainnet! The 1Sat Ordinals ecosystem is growing fast. Excited to see what builders create next.",
    timestamp: Math.floor(Date.now() / 1000) - 300,
    app: "bsocial",
    type: "post",
    signers: [
      {
        algorithm: "BITCOIN_ECDSA",
        address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        bapId: "bap_id_satoshi_001",
      },
    ],
    author: { bapId: "bap_id_satoshi_001", name: "Satoshi" },
    likes: 42,
    replies: 7,
  },
  {
    txid: "b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a",
    content:
      "On-chain social is the future. No censorship, no deplatforming, just pure peer-to-peer communication backed by proof of work.",
    timestamp: Math.floor(Date.now() / 1000) - 3600,
    app: "bsocial",
    type: "post",
    channel: "general",
    signers: [
      {
        algorithm: "BITCOIN_ECDSA",
        address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      },
    ],
    likes: 18,
    replies: 3,
  },
  {
    txid: "c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2",
    content:
      "Building a marketplace for ordinals. Each listing is a single on-chain transaction. No middlemen, no fees beyond mining costs. This is how commerce should work.",
    timestamp: Math.floor(Date.now() / 1000) - 7200,
    app: "bsocial",
    type: "post",
    channel: "dev",
    signers: [
      {
        algorithm: "BITCOIN_ECDSA",
        address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
        bapId: "bap_id_builder_003",
      },
    ],
    author: { bapId: "bap_id_builder_003", name: "Builder Alice" },
    likes: 91,
    replies: 15,
  },
  {
    txid: "d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3",
    content: "gm",
    timestamp: Math.floor(Date.now() / 1000) - 43200,
    app: "bsocial",
    type: "post",
    signers: [
      {
        algorithm: "BITCOIN_ECDSA",
        address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
      },
    ],
    likes: 5,
    replies: 0,
  },
  {
    txid: "e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4",
    content:
      "Thinking about how BSocial posts are permanent on-chain records. Every thought, every idea, immutably stored on the blockchain. Write thoughtfully.",
    timestamp: Math.floor(Date.now() / 1000) - 86400,
    app: "bsocial",
    type: "post",
    channel: "philosophy",
    signers: [
      {
        algorithm: "BITCOIN_ECDSA",
        address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
        bapId: "bap_id_thinker_005",
      },
    ],
    author: { bapId: "bap_id_thinker_005", name: "Deep Thinker" },
    likes: 27,
    replies: 9,
  },
]

// ---------------------------------------------------------------------------
// Demo
// ---------------------------------------------------------------------------

export default function SocialFeedDemo() {
  const [clickedPost, setClickedPost] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {clickedPost && (
        <div className="rounded-md border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
          Clicked post: <code className="font-mono">{clickedPost.slice(0, 16)}...</code>
        </div>
      )}

      <div className="rounded-lg border border-border overflow-hidden">
        <SocialFeedUI
          posts={MOCK_POSTS}
          isLoading={false}
          isLoadingMore={false}
          error={null}
          hasMore={false}
          onLoadMore={() => {}}
          onRefresh={() => {}}
          infiniteScroll={false}
          onPostClick={(post) => setClickedPost(post.txid)}
          onAuthorClick={(post) =>
            setClickedPost(`author:${post.signers?.[0]?.address ?? "unknown"}`)
          }
        />
      </div>
    </div>
  )
}
