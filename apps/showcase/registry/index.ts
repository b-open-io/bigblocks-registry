export const registry = {
  name: "bigblocks",
  items: [
    // ── Existing ──
    {
      name: "step-indicator",
      type: "registry:ui",
      title: "Step Indicator",
      description: "Display progress through multi-step processes with horizontal and vertical variants",
      categories: ["ui-components"],
      files: [{ path: "ui/step-indicator.tsx", type: "registry:ui" }],
      dependencies: ["@radix-ui/react-icons"],
    },

    // ── Wallet ──
    {
      name: "connect-wallet",
      type: "registry:block",
      title: "Connect Wallet",
      description: "Wallet connection button with provider selection and connected-state dropdown",
      categories: ["wallet"],
      files: [
        { path: "blocks/connect-wallet/index.tsx", type: "registry:block" },
        { path: "blocks/connect-wallet/ui.tsx", type: "registry:component" },
        { path: "blocks/connect-wallet/use-connect-wallet.ts", type: "registry:hook" },
      ],
    },
    {
      name: "send-bsv",
      type: "registry:block",
      title: "Send BSV",
      description: "Complete send BSV block with trigger variants and dialog form",
      categories: ["wallet"],
      files: [
        { path: "blocks/send-bsv/index.tsx", type: "registry:block" },
        { path: "blocks/send-bsv/send-bsv-trigger.tsx", type: "registry:component" },
        { path: "blocks/send-bsv/send-bsv-dialog.tsx", type: "registry:component" },
      ],
    },
    {
      name: "token-list",
      type: "registry:block",
      title: "Token List",
      description: "BSV20/BSV21 token holdings list with balances and icons",
      categories: ["wallet"],
      files: [
        { path: "blocks/token-list/index.tsx", type: "registry:block" },
        { path: "blocks/token-list/token-list-ui.tsx", type: "registry:component" },
        { path: "blocks/token-list/use-token-list.ts", type: "registry:hook" },
      ],
    },

    // ── Social ──
    {
      name: "post-button",
      type: "registry:block",
      title: "Post Button",
      description: "Create on-chain BSocial posts with compose dialog",
      categories: ["social"],
      files: [
        { path: "blocks/post-button/index.tsx", type: "registry:block" },
        { path: "blocks/post-button/ui.tsx", type: "registry:component" },
        { path: "blocks/post-button/use-post.ts", type: "registry:hook" },
      ],
    },
    {
      name: "like-button",
      type: "registry:block",
      title: "Like Button",
      description: "Optimistic like/unlike toggle for BSocial content",
      categories: ["social"],
      files: [
        { path: "blocks/like-button/index.tsx", type: "registry:block" },
        { path: "blocks/like-button/ui.tsx", type: "registry:component" },
        { path: "blocks/like-button/use-like.ts", type: "registry:hook" },
      ],
    },
    {
      name: "follow-button",
      type: "registry:block",
      title: "Follow Button",
      description: "Three-state follow/following/unfollow toggle",
      categories: ["social"],
      files: [
        { path: "blocks/follow-button/index.tsx", type: "registry:block" },
        { path: "blocks/follow-button/ui.tsx", type: "registry:component" },
        { path: "blocks/follow-button/use-follow.ts", type: "registry:hook" },
      ],
    },
    {
      name: "friend-button",
      type: "registry:block",
      title: "Friend Button",
      description: "Four-state friend request button with accept/decline",
      categories: ["social"],
      files: [
        { path: "blocks/friend-button/index.tsx", type: "registry:block" },
        { path: "blocks/friend-button/ui.tsx", type: "registry:component" },
        { path: "blocks/friend-button/use-friend.ts", type: "registry:hook" },
      ],
    },
    {
      name: "social-feed",
      type: "registry:block",
      title: "Social Feed",
      description: "Chronological feed of on-chain BSocial posts",
      categories: ["social"],
      files: [
        { path: "blocks/social-feed/index.tsx", type: "registry:block" },
        { path: "blocks/social-feed/social-feed-ui.tsx", type: "registry:component" },
        { path: "blocks/social-feed/post-card-ui.tsx", type: "registry:component" },
        { path: "blocks/social-feed/use-social-feed.ts", type: "registry:hook" },
      ],
    },

    // ── Marketplace ──
    {
      name: "inscribe-file",
      type: "registry:block",
      title: "Inscribe File",
      description: "Full inscription flow with file upload, BSV20/BSV21 tabs, and metadata",
      categories: ["market"],
      files: [
        { path: "blocks/inscribe-file/index.tsx", type: "registry:block" },
        { path: "blocks/inscribe-file/inscribe-dropzone.tsx", type: "registry:component" },
        { path: "blocks/inscribe-file/inscribe-form.tsx", type: "registry:component" },
        { path: "blocks/inscribe-file/content-type-select.tsx", type: "registry:component" },
        { path: "blocks/inscribe-file/bsv20-form.tsx", type: "registry:component" },
        { path: "blocks/inscribe-file/bsv21-form.tsx", type: "registry:component" },
      ],
    },
    {
      name: "deploy-token",
      type: "registry:block",
      title: "Deploy Token",
      description: "Deploy BSV21 fungible tokens with icon upload",
      categories: ["market"],
      files: [
        { path: "blocks/deploy-token/index.tsx", type: "registry:block" },
        { path: "blocks/deploy-token/ui.tsx", type: "registry:component" },
        { path: "blocks/deploy-token/use-deploy-token.ts", type: "registry:hook" },
      ],
    },
    {
      name: "create-listing",
      type: "registry:block",
      title: "Create Listing",
      description: "List ordinal NFTs for sale via OrdLock contract",
      categories: ["market"],
      files: [
        { path: "blocks/create-listing/index.tsx", type: "registry:block" },
        { path: "blocks/create-listing/ui.tsx", type: "registry:component" },
        { path: "blocks/create-listing/use-create-listing.ts", type: "registry:hook" },
      ],
    },
    {
      name: "buy-listing",
      type: "registry:block",
      title: "Buy Listing",
      description: "Purchase ordinal NFTs from the global orderbook",
      categories: ["market"],
      files: [
        { path: "blocks/buy-listing/index.tsx", type: "registry:block" },
        { path: "blocks/buy-listing/ui.tsx", type: "registry:component" },
        { path: "blocks/buy-listing/use-buy-listing.ts", type: "registry:hook" },
      ],
    },
    {
      name: "ordinals-grid",
      type: "registry:block",
      title: "Ordinals Grid",
      description: "Responsive grid of owned ordinal NFTs with ORDFS thumbnails",
      categories: ["market"],
      files: [
        { path: "blocks/ordinals-grid/index.tsx", type: "registry:block" },
        { path: "blocks/ordinals-grid/ordinals-grid-ui.tsx", type: "registry:component" },
        { path: "blocks/ordinals-grid/use-ordinals-grid.ts", type: "registry:hook" },
      ],
    },
    {
      name: "market-grid",
      type: "registry:block",
      title: "Market Grid",
      description: "Global orderbook grid with listings and buy actions",
      categories: ["market"],
      files: [
        { path: "blocks/market-grid/index.tsx", type: "registry:block" },
        { path: "blocks/market-grid/market-grid-ui.tsx", type: "registry:component" },
        { path: "blocks/market-grid/listing-card-ui.tsx", type: "registry:component" },
        { path: "blocks/market-grid/use-market-grid.ts", type: "registry:hook" },
      ],
    },

    // ── Identity ──
    {
      name: "bitcoin-avatar",
      type: "registry:block",
      title: "Bitcoin Avatar",
      description: "On-chain image resolution with deterministic sigma-avatars fallback",
      categories: ["identity"],
      files: [
        { path: "blocks/bitcoin-avatar/index.tsx", type: "registry:block" },
        { path: "blocks/bitcoin-avatar/ui.tsx", type: "registry:component" },
        { path: "blocks/bitcoin-avatar/use-bitcoin-avatar.ts", type: "registry:hook" },
      ],
    },
    {
      name: "profile-card",
      type: "registry:block",
      title: "Profile Card",
      description: "Display BAP identity profile with avatar, name, bio",
      categories: ["identity"],
      files: [
        { path: "blocks/profile-card/index.tsx", type: "registry:block" },
        { path: "blocks/profile-card/profile-card-ui.tsx", type: "registry:component" },
        { path: "blocks/profile-card/use-profile-card.ts", type: "registry:hook" },
      ],
    },
    {
      name: "identity-selector",
      type: "registry:block",
      title: "Identity Selector",
      description: "Switch between BAP identities with active indicator",
      categories: ["identity"],
      files: [
        { path: "blocks/identity-selector/index.tsx", type: "registry:block" },
        { path: "blocks/identity-selector/identity-selector-ui.tsx", type: "registry:component" },
        { path: "blocks/identity-selector/use-identity-selector.ts", type: "registry:hook" },
      ],
    },
  ],

  examples: [
    // Step Indicator
    { name: "step-indicator-demo", registryDependencies: ["step-indicator"], files: [{ path: "examples/step-indicator-demo.tsx", type: "registry:example" }] },
    { name: "step-indicator-vertical", registryDependencies: ["step-indicator"], files: [{ path: "examples/step-indicator-vertical.tsx", type: "registry:example" }] },
    { name: "step-indicator-with-descriptions", registryDependencies: ["step-indicator"], files: [{ path: "examples/step-indicator-with-descriptions.tsx", type: "registry:example" }] },

    // Wallet
    { name: "connect-wallet-demo", registryDependencies: ["connect-wallet"], files: [{ path: "examples/connect-wallet-demo.tsx", type: "registry:example" }] },
    { name: "connect-wallet-compact", registryDependencies: ["connect-wallet"], files: [{ path: "examples/connect-wallet-compact.tsx", type: "registry:example" }] },
    { name: "send-bsv-demo", registryDependencies: ["send-bsv"], files: [{ path: "examples/send-bsv-demo.tsx", type: "registry:example" }] },
    { name: "send-bsv-compact", registryDependencies: ["send-bsv"], files: [{ path: "examples/send-bsv-compact.tsx", type: "registry:example" }] },
    { name: "send-bsv-quick", registryDependencies: ["send-bsv"], files: [{ path: "examples/send-bsv-quick.tsx", type: "registry:example" }] },
    { name: "token-list-demo", registryDependencies: ["token-list"], files: [{ path: "examples/token-list-demo.tsx", type: "registry:example" }] },

    // Social
    { name: "post-button-demo", registryDependencies: ["post-button"], files: [{ path: "examples/post-button-demo.tsx", type: "registry:example" }] },
    { name: "post-button-compact", registryDependencies: ["post-button"], files: [{ path: "examples/post-button-compact.tsx", type: "registry:example" }] },
    { name: "post-button-inline", registryDependencies: ["post-button"], files: [{ path: "examples/post-button-inline.tsx", type: "registry:example" }] },
    { name: "like-button-demo", registryDependencies: ["like-button"], files: [{ path: "examples/like-button-demo.tsx", type: "registry:example" }] },
    { name: "like-button-liked", registryDependencies: ["like-button"], files: [{ path: "examples/like-button-liked.tsx", type: "registry:example" }] },
    { name: "like-button-compact", registryDependencies: ["like-button"], files: [{ path: "examples/like-button-compact.tsx", type: "registry:example" }] },
    { name: "like-button-text", registryDependencies: ["like-button"], files: [{ path: "examples/like-button-text.tsx", type: "registry:example" }] },
    { name: "follow-button-demo", registryDependencies: ["follow-button"], files: [{ path: "examples/follow-button-demo.tsx", type: "registry:example" }] },
    { name: "follow-button-compact", registryDependencies: ["follow-button"], files: [{ path: "examples/follow-button-compact.tsx", type: "registry:example" }] },
    { name: "follow-button-states", registryDependencies: ["follow-button"], files: [{ path: "examples/follow-button-states.tsx", type: "registry:example" }] },
    { name: "friend-button-demo", registryDependencies: ["friend-button"], files: [{ path: "examples/friend-button-demo.tsx", type: "registry:example" }] },
    { name: "friend-button-pending", registryDependencies: ["friend-button"], files: [{ path: "examples/friend-button-pending.tsx", type: "registry:example" }] },
    { name: "friend-button-received", registryDependencies: ["friend-button"], files: [{ path: "examples/friend-button-received.tsx", type: "registry:example" }] },
    { name: "friend-button-friends", registryDependencies: ["friend-button"], files: [{ path: "examples/friend-button-friends.tsx", type: "registry:example" }] },
    { name: "social-feed-demo", registryDependencies: ["social-feed"], files: [{ path: "examples/social-feed-demo.tsx", type: "registry:example" }] },

    // Marketplace
    { name: "inscribe-file-demo", registryDependencies: ["inscribe-file"], files: [{ path: "examples/inscribe-file-demo.tsx", type: "registry:example" }] },
    { name: "deploy-token-demo", registryDependencies: ["deploy-token"], files: [{ path: "examples/deploy-token-demo.tsx", type: "registry:example" }] },
    { name: "create-listing-demo", registryDependencies: ["create-listing"], files: [{ path: "examples/create-listing-demo.tsx", type: "registry:example" }] },
    { name: "buy-listing-demo", registryDependencies: ["buy-listing"], files: [{ path: "examples/buy-listing-demo.tsx", type: "registry:example" }] },
    { name: "ordinals-grid-demo", registryDependencies: ["ordinals-grid"], files: [{ path: "examples/ordinals-grid-demo.tsx", type: "registry:example" }] },
    { name: "market-grid-demo", registryDependencies: ["market-grid"], files: [{ path: "examples/market-grid-demo.tsx", type: "registry:example" }] },

    // Identity
    { name: "bitcoin-avatar-demo", registryDependencies: ["bitcoin-avatar"], files: [{ path: "examples/bitcoin-avatar-demo.tsx", type: "registry:example" }] },
    { name: "bitcoin-avatar-variants", registryDependencies: ["bitcoin-avatar"], files: [{ path: "examples/bitcoin-avatar-variants.tsx", type: "registry:example" }] },
    { name: "profile-card-demo", registryDependencies: ["profile-card"], files: [{ path: "examples/profile-card-demo.tsx", type: "registry:example" }] },
    { name: "identity-selector-demo", registryDependencies: ["identity-selector"], files: [{ path: "examples/identity-selector-demo.tsx", type: "registry:example" }] },
  ],
}
