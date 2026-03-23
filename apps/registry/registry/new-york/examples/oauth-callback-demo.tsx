"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { OAuthCallbackUI } from "@/registry/new-york/blocks/oauth-callback/oauth-callback-ui"
import type {
  OAuthCallbackStatus,
  OAuthCallbackUser,
} from "@/registry/new-york/blocks/oauth-callback/use-oauth-callback"

const MOCK_USER: OAuthCallbackUser = {
  id: "usr_abc123",
  name: "Satoshi Nakamoto",
  pubkey: "02a1633cafcc01ebfb6d78e39f687a1f0995c62fc95f51ead10a02ee0be551b5dc",
  bapId: "A4PYmuKGG61WCjjBaRpuSEbqytG",
}

export default function OAuthCallbackDemo() {
  const [status, setStatus] = useState<OAuthCallbackStatus>("loading")

  return (
    <div className="flex flex-col gap-6">
      {/* State selector */}
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-medium text-muted-foreground mr-2">
          Preview state:
        </p>
        <Button
          variant={status === "loading" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatus("loading")}
        >
          Loading
        </Button>
        <Button
          variant={status === "success" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatus("success")}
        >
          Success
        </Button>
        <Button
          variant={status === "error" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatus("error")}
        >
          Error
        </Button>
      </div>

      <Separator />

      {/* Preview */}
      <OAuthCallbackUI
        status={status}
        user={status === "success" ? MOCK_USER : null}
        errorMessage={
          status === "error"
            ? "Invalid state parameter. This may indicate a security issue. Please try signing in again."
            : null
        }
        redirectUrl="/dashboard"
        onRetry={() => setStatus("loading")}
      />
    </div>
  )
}
