"use client"

import {
  SocialFeedUI,
  type SocialPost,
} from "@/registry/bigblocks/blocks/social-feed"

const MOCK_POSTS: SocialPost[] = [
  {
    txid: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
    content: "Just deployed my first BSV21 token on mainnet! The 1Sat Ordinals ecosystem is growing fast.",
    timestamp: Math.floor(Date.now() / 1000) - 300,
    app: "bsocial",
    type: "post",
    signers: [{ algorithm: "BITCOIN_ECDSA", address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", bapId: "bap_satoshi" }],
    author: { bapId: "bap_satoshi", name: "satoshi" },
    likes: 42,
    replies: 3,
  },
  {
    txid: "b2c3d4e5f67890123456789012345678901234567890abcdef1234567890abcd",
    content: "Running bitcoin.",
    timestamp: Math.floor(Date.now() / 1000) - 900,
    app: "bsocial",
    type: "post",
    signers: [{ algorithm: "BITCOIN_ECDSA", address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", bapId: "bap_hal" }],
    author: { bapId: "bap_hal", name: "hal" },
    likes: 18,
    replies: 1,
  },
]

export default function SocialFeedDemo() {
  return (
    <div className="mx-auto max-w-2xl">
      <SocialFeedUI
        posts={MOCK_POSTS}
        isLoading={false}
        isLoadingMore={false}
        error={null}
        hasMore={false}
        onLoadMore={() => {}}
        onRefresh={() => {}}
        infiniteScroll={false}
      />
    </div>
  )
}
