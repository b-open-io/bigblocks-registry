import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Wallet,
  Heart,
  ShoppingCart,
  User,
  ArrowRight,
  Copy,
  Terminal,
} from "lucide-react"

const categories = [
  {
    name: "Wallet",
    description: "Connect wallets, send BSV, and manage token balances.",
    icon: Wallet,
    count: 3,
    href: "/docs/blocks/connect-wallet",
    blocks: ["connect-wallet", "send-bsv", "token-list"],
  },
  {
    name: "Social",
    description: "Post onchain, like content, follow users, and add friends.",
    icon: Heart,
    count: 5,
    href: "/docs/blocks/post-button",
    blocks: ["post-button", "like-button", "follow-button", "friend-button", "social-feed"],
  },
  {
    name: "Marketplace",
    description: "Inscribe files, deploy tokens, create and buy listings.",
    icon: ShoppingCart,
    count: 6,
    href: "/docs/blocks/inscribe-file",
    blocks: [
      "inscribe-file",
      "deploy-token",
      "create-listing",
      "buy-listing",
      "ordinals-grid",
      "market-grid",
    ],
  },
  {
    name: "Identity",
    description: "Bitcoin avatars, profile cards, and identity selection.",
    icon: User,
    count: 3,
    href: "/docs/blocks/bitcoin-avatar",
    blocks: ["bitcoin-avatar", "profile-card", "identity-selector"],
  },
] as const

const featuredBlocks = [
  {
    name: "connect-wallet",
    label: "Connect Wallet",
    description: "One-click Bitcoin wallet connection with provider detection.",
    category: "Wallet",
  },
  {
    name: "send-bsv",
    label: "Send BSV",
    description: "Send Bitcoin SV with address validation and fee estimation.",
    category: "Wallet",
  },
  {
    name: "post-button",
    label: "Post Button",
    description: "Publish onchain posts to the Bitcoin blockchain.",
    category: "Social",
  },
  {
    name: "inscribe-file",
    label: "Inscribe File",
    description: "Inscribe files as 1Sat Ordinals with drag-and-drop upload.",
    category: "Marketplace",
  },
  {
    name: "bitcoin-avatar",
    label: "Bitcoin Avatar",
    description: "Display user avatars resolved from Bitcoin identity protocols.",
    category: "Identity",
  },
  {
    name: "like-button",
    label: "Like Button",
    description: "Onchain like reactions backed by Bitcoin transactions.",
    category: "Social",
  },
] as const

export default function Home() {
  const installCommand =
    "bunx shadcn@latest add https://registry.bigblocks.dev/r/[name].json"

  return (
    <div className="flex flex-col gap-16 py-10">
      {/* Hero */}
      <section className="flex flex-col gap-6 text-center items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            BigBlocks
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bitcoin UI blocks for React. A shadcn-compatible registry of
            production-ready components for wallets, social, marketplaces, and
            identity.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xl">
          <div className="flex items-center gap-2 rounded-lg border bg-muted px-4 py-3 font-mono text-sm">
            <Terminal className="size-4 shrink-0 text-muted-foreground" />
            <code className="flex-1 truncate text-left">{installCommand}</code>
            <Copy className="size-4 shrink-0 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button asChild>
              <Link href="/docs">
                Browse Docs
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/installation">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* Categories */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-semibold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Blocks organized by what you are building.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="h-full transition-colors hover:bg-accent/50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-md border bg-muted size-10">
                        <Icon className="size-5 text-foreground" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <CardTitle className="text-lg">
                          {category.name}
                        </CardTitle>
                        <Badge variant="secondary" className="w-fit">
                          {category.count} blocks
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{category.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <Separator />

      {/* Featured Blocks */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-semibold tracking-tight">
            Featured Blocks
          </h2>
          <p className="text-muted-foreground">
            Highlights from the registry, ready to drop into your app.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBlocks.map((block) => (
            <Card
              key={block.name}
              className="flex flex-col justify-between transition-colors hover:bg-accent/50"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{block.label}</CardTitle>
                  <Badge variant="outline">{block.category}</Badge>
                </div>
                <CardDescription>{block.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild className="ml-auto">
                  <Link href={`/docs/blocks/${block.name}`}>
                    View docs
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
