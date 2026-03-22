"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Wallet } from "lucide-react"

export default function ConnectWalletDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-3">Variants</p>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Button>
              <Wallet data-icon="inline-start" />
              Connect Wallet
            </Button>
            <span className="text-xs text-muted-foreground">default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="icon">
              <Wallet />
            </Button>
            <span className="text-xs text-muted-foreground">compact</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button variant="outline" size="sm">
              <Wallet data-icon="inline-start" />
              Connect
            </Button>
            <span className="text-xs text-muted-foreground">outline</span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Connected State</p>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Avatar className="size-6">
              <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                SA
              </AvatarFallback>
            </Avatar>
            <span className="font-mono text-xs">02a1b2...d4e5</span>
            <ChevronDown className="size-3 text-muted-foreground" />
          </Button>
          <Badge variant="secondary">Connected</Badge>
        </div>
      </div>
    </div>
  )
}
