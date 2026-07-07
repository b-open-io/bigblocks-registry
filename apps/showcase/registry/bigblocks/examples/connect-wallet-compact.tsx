"use client"

import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ConnectWalletCompact() {
  return (
    <Button size="icon">
      <Wallet />
    </Button>
  )
}
