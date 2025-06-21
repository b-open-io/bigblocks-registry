export const components = [
  {
    name: "step-indicator",
    type: "registry:ui",
    title: "Step Indicator", 
    description: "Display progress through multi-step processes with horizontal and vertical variants",
    category: "ui",
    dependencies: ["@radix-ui/react-icons"],
    registryDependencies: [],
    files: [{
      path: "registry/new-york/ui/step-indicator.tsx",
      type: "registry:ui"
    }]
  }
];

export const categories = [
  {
    name: "authentication",
    title: "Authentication",
    description: "Bitcoin wallet authentication flows",
    emoji: "🔐"
  },
  {
    name: "social", 
    title: "Social",
    description: "Posts, likes, follows, messaging",
    emoji: "💬"
  },
  {
    name: "wallet",
    title: "Wallet", 
    description: "Send BSV, view balances, manage tokens",
    emoji: "💰"
  },
  {
    name: "market",
    title: "Market",
    description: "NFT marketplace components",
    emoji: "🏪"
  },
  {
    name: "ui",
    title: "UI Components",
    description: "Base UI elements and utilities",
    emoji: "🎨"
  }
];