"use client"

import { useState, useCallback } from "react"
import { ConnectWalletUI } from "@/registry/bigblocks/blocks/connect-wallet/ui"

/**
 * Demo that cycles through wallet connection states using mock data.
 * Does NOT require WalletProvider — drives ConnectWalletUI directly.
 */
export default function ConnectWalletDemo() {
  const [status, setStatus] = useState("disconnected")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const mockIdentityKey =
    "02a1633cafcc01ebfb6d78e39f687a1f0995c62fc95f51ead10a02ee0be551b5dc"
  const truncatedKey = `${mockIdentityKey.slice(0, 8)}...${mockIdentityKey.slice(-6)}`
  const gradient =
    "linear-gradient(135deg, hsl(200, 70%, 50%), hsl(280, 70%, 50%))"

  const handleTriggerClick = useCallback(() => {
    setStatus("connecting")
    setTimeout(() => {
      setStatus("connected")
    }, 1500)
  }, [])

  const handleDisconnect = useCallback(() => {
    setStatus("disconnected")
  }, [])

  const handleCopy = useCallback(() => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <div className="flex items-center justify-center">
      <ConnectWalletUI
        variant="default"
        connectLabel="Connect Wallet"
        status={status}
        identityKey={status === "connected" ? mockIdentityKey : undefined}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        gradient={gradient}
        truncatedKey={truncatedKey}
        onTriggerClick={handleTriggerClick}
        onDisconnect={handleDisconnect}
        onCopy={handleCopy}
        copied={copied}
        error={null}
      />
    </div>
  )
}
