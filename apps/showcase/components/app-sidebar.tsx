"use client"

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import type * as React from "react"
import { BBMark } from "@/components/bb-mark"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// BigBlocks navigation data
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "/",
      items: [
        { title: "Introduction", url: "/" },
      ],
    },
    {
      title: "Authentication",
      url: "/docs/blocks/bitcoin-signin",
      items: [
        { title: "Bitcoin Signin", url: "/docs/blocks/bitcoin-signin" },
        { title: "OAuth Callback", url: "/docs/blocks/oauth-callback" },
        { title: "Cloud Backup Prompt", url: "/docs/blocks/cloud-backup-prompt" },
      ],
    },
    {
      title: "Wallet",
      url: "/docs/blocks/connect-wallet",
      items: [
        { title: "Connect Wallet", url: "/docs/blocks/connect-wallet" },
        { title: "Send BSV", url: "/docs/blocks/send-bsv" },
        { title: "Receive Address", url: "/docs/blocks/receive-address" },
        { title: "Transaction History", url: "/docs/blocks/transaction-history" },
        { title: "Token List", url: "/docs/blocks/token-list" },
        { title: "Mnemonic Flow", url: "/docs/blocks/mnemonic-flow" },
        { title: "Lock BSV", url: "/docs/blocks/lock-bsv" },
        { title: "Sweep Wallet", url: "/docs/blocks/sweep-wallet" },
        { title: "Send BSV21", url: "/docs/blocks/send-bsv21" },
        { title: "Unlock Wallet", url: "/docs/blocks/unlock-wallet" },
        { title: "Wallet Overview", url: "/docs/blocks/wallet-overview" },
      ],
    },
    {
      title: "Social",
      url: "/docs/blocks/post-button",
      items: [
        { title: "Post Button", url: "/docs/blocks/post-button" },
        { title: "Like Button", url: "/docs/blocks/like-button" },
        { title: "Follow Button", url: "/docs/blocks/follow-button" },
        { title: "Friend Button", url: "/docs/blocks/friend-button" },
        { title: "Social Feed", url: "/docs/blocks/social-feed" },
      ],
    },
    {
      title: "Marketplace",
      url: "/docs/blocks/inscribe-file",
      items: [
        { title: "Inscribe File", url: "/docs/blocks/inscribe-file" },
        { title: "Deploy Token", url: "/docs/blocks/deploy-token" },
        { title: "Create Listing", url: "/docs/blocks/create-listing" },
        { title: "Buy Listing", url: "/docs/blocks/buy-listing" },
        { title: "Ordinals Grid", url: "/docs/blocks/ordinals-grid" },
        { title: "Market Grid", url: "/docs/blocks/market-grid" },
      ],
    },
    {
      title: "Identity",
      url: "/docs/blocks/bitcoin-avatar",
      items: [
        { title: "Bitcoin Avatar", url: "/docs/blocks/bitcoin-avatar" },
        { title: "Profile Card", url: "/docs/blocks/profile-card" },
        { title: "Identity Selector", url: "/docs/blocks/identity-selector" },
        { title: "OpNS Manager", url: "/docs/blocks/opns-manager" },
      ],
    },
    {
      title: "Developer",
      url: "/docs/blocks/sync-terminal",
      items: [
        { title: "Step Indicator", url: "/docs/blocks/step-indicator" },
        { title: "Sync Terminal", url: "/docs/blocks/sync-terminal" },
        { title: "Theme Token Provider", url: "/docs/blocks/theme-token-provider" },
        { title: "BigBlocks Provider", url: "/docs/blocks/bigblocks-provider" },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <span className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-md bg-[#FCC800]">
                    <BBMark className="w-5 text-[#0A0A0A]" />
                  </span>
                  <span className="font-semibold tracking-tight">BigBlocks</span>
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <PlusIcon className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <MinusIcon className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
