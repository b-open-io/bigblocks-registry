"use client"

import { ProfileCardUI } from "@/registry/bigblocks/blocks/profile-card/profile-card-ui"
import type { BapProfile } from "@/registry/bigblocks/blocks/profile-card/use-profile-card"

const MOCK_PROFILE: BapProfile = {
  name: "Satoshi Nakamoto",
  alternateName: "satoshi",
  description: "Creator of Bitcoin. Building a peer-to-peer electronic cash system.",
  image: undefined,
  url: "https://bitcoin.org",
}

export default function ProfileCardDemo() {
  return (
    <ProfileCardUI
      bapId="Go8vCHAa4S6AhXKdRp3nT9wJm"
      profile={MOCK_PROFILE}
      currentAddress="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
      isLoading={false}
      error={null}
    />
  )
}
