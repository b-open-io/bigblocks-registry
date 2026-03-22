"use client"

import { useCallback, useState } from "react"
import {
  BigBlocksProvider,
  useBigBlocks,
  type BigBlocksBalance,
  type BigBlocksOrdinal,
} from "@/registry/bigblocks/blocks/bigblocks-provider"

// ---------------------------------------------------------------------------
// Inner component that reads context
// ---------------------------------------------------------------------------

function ContextInspector() {
  const { apiUrl, ordfsUrl, getBalance, getOrdinals, getTokenBalances, getHistory } =
    useBigBlocks()

  const hasCustomFetchers =
    !!getBalance || !!getOrdinals || !!getTokenBalances || !!getHistory

  return (
    <div className="rounded-md border border-border bg-muted/50 p-4 font-mono text-sm">
      <p className="mb-2 font-sans font-medium text-foreground">
        Active Configuration
      </p>
      <div className="flex flex-col gap-1 text-muted-foreground">
        <span>
          mode: <strong className="text-foreground">{hasCustomFetchers ? "custom" : "web"}</strong>
        </span>
        <span>apiUrl: {apiUrl}</span>
        <span>ordfsUrl: {ordfsUrl}</span>
        <span>getBalance: {getBalance ? "provided" : "none"}</span>
        <span>getOrdinals: {getOrdinals ? "provided" : "none"}</span>
        <span>getTokenBalances: {getTokenBalances ? "provided" : "none"}</span>
        <span>getHistory: {getHistory ? "provided" : "none"}</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Demo
// ---------------------------------------------------------------------------

/** Demo showing both web mode and custom mode of BigBlocksProvider */
export default function BigBlocksProviderDemo() {
  const [mode, setMode] = useState<"web" | "custom">("web")

  // Simulated custom fetchers for demo purposes
  const mockGetBalance = useCallback(
    async (_address: string): Promise<BigBlocksBalance> => ({
      confirmed: 150000,
      unconfirmed: 5000,
      total: 155000,
    }),
    []
  )

  const mockGetOrdinals = useCallback(
    async (_address: string, _limit?: number): Promise<BigBlocksOrdinal[]> => [
      {
        outpoint: "abc123_0",
        contentType: "image/png",
        name: "Mock Ordinal #1",
        origin: "abc123_0",
      },
    ],
    []
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("web")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === "web"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          Web Mode
        </button>
        <button
          type="button"
          onClick={() => setMode("custom")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === "custom"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          Custom Mode
        </button>
      </div>

      {mode === "web" ? (
        <BigBlocksProvider>
          <ContextInspector />
        </BigBlocksProvider>
      ) : (
        <BigBlocksProvider
          apiUrl="http://localhost:8080/rpc"
          ordfsUrl="http://localhost:9090"
          getBalance={mockGetBalance}
          getOrdinals={mockGetOrdinals}
        >
          <ContextInspector />
        </BigBlocksProvider>
      )}
    </div>
  )
}
