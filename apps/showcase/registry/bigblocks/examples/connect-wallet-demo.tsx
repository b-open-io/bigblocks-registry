"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Copy, LogOut, Loader2, Wallet } from "lucide-react"

type Status = "disconnected" | "connecting" | "connected"

export default function ConnectWalletDemo() {
  const [status, setStatus] = useState<Status>("disconnected")

  function handleConnect() {
    setStatus("connecting")
    setTimeout(() => setStatus("connected"), 1500)
  }

  function handleDisconnect() {
    setStatus("disconnected")
  }

  if (status === "connecting") {
    return (
      <Button disabled>
        <Loader2 className="animate-spin" data-icon="inline-start" />
        Connecting...
      </Button>
    )
  }

  if (status === "connected") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Avatar className="size-6">
              <AvatarFallback className="text-xs">SA</AvatarFallback>
            </Avatar>
            <span className="font-mono text-xs">02a1b2...d4e5</span>
            <ChevronDown className="size-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="font-mono text-xs">
            <Copy data-icon="inline-start" />
            02a1b2c3d4e5f6a7b8c9
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect}>
            <LogOut data-icon="inline-start" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button onClick={handleConnect}>
      <Wallet data-icon="inline-start" />
      Connect Wallet
    </Button>
  )
}
