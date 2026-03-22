"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react"

export default function ConnectWalletConnected() {
  return (
    <Button variant="outline" className="gap-2">
      <Avatar className="size-6">
        <AvatarFallback className="text-xs">SA</AvatarFallback>
      </Avatar>
      <span className="font-mono text-xs">02a1b2...d4e5</span>
      <ChevronDown className="size-3 text-muted-foreground" />
    </Button>
  )
}
