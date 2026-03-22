"use client"

import { ProfileCard } from "@/registry/bigblocks/blocks/profile-card"
import { ProfileCardUI } from "@/registry/bigblocks/blocks/profile-card/profile-card-ui"
import { Button } from "@/components/ui/button"
import type { BapProfile } from "@/registry/bigblocks/blocks/profile-card/use-profile-card"

const MOCK_BAP_ID = "Go8vCHAa4S6AhXKdRp3nT9wJm"
const MOCK_ADDRESS = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"

const MOCK_PROFILE: BapProfile = {
  name: "Satoshi Nakamoto",
  alternateName: "satoshi",
  description:
    "Creator of Bitcoin. Building a peer-to-peer electronic cash system.",
  image: undefined,
  url: "https://bitcoin.org",
}

export default function ProfileCardDemo() {
  return (
    <div className="space-y-8">
      {/* Populated profile with mock data */}
      <div className="space-y-2">
        <p className="text-sm font-medium">With profile data</p>
        <ProfileCardUI
          bapId={MOCK_BAP_ID}
          profile={MOCK_PROFILE}
          currentAddress={MOCK_ADDRESS}
          isLoading={false}
          error={null}
        />
      </div>

      {/* With follow button slot */}
      <div className="space-y-2">
        <p className="text-sm font-medium">With action slot</p>
        <ProfileCardUI
          bapId={MOCK_BAP_ID}
          profile={MOCK_PROFILE}
          currentAddress={MOCK_ADDRESS}
          isLoading={false}
          error={null}
          renderAction={() => (
            <Button variant="outline" size="sm">
              Follow
            </Button>
          )}
        />
      </div>

      {/* Loading state */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Loading state</p>
        <ProfileCardUI
          bapId={null}
          profile={null}
          currentAddress={null}
          isLoading={true}
          error={null}
        />
      </div>

      {/* Error state */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Error state</p>
        <ProfileCardUI
          bapId={null}
          profile={null}
          currentAddress={null}
          isLoading={false}
          error={new Error("Failed to resolve address: 404")}
          onRetry={() => {}}
        />
      </div>

      {/* No identity found */}
      <div className="space-y-2">
        <p className="text-sm font-medium">No identity found</p>
        <ProfileCardUI
          bapId={null}
          profile={null}
          currentAddress={null}
          isLoading={false}
          error={null}
        />
      </div>
    </div>
  )
}
