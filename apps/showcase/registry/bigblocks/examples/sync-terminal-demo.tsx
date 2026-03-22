"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  SyncTerminalUI,
  type SyncEvent,
  type SyncEventLevel,
  type SyncStatus,
} from "@/registry/bigblocks/blocks/sync-terminal"

// ---------------------------------------------------------------------------
// Mock data generators
// ---------------------------------------------------------------------------

const SOURCES = ["sync", "wallet", "http", "mempool"] as const

const MESSAGES: Record<SyncEventLevel, string[]> = {
  log: [
    "Processing block #__HEIGHT__",
    "Indexed 142 transactions",
    "Mempool: 38 pending txs",
    "Peer connected: 45.33.32.156:8333",
    "UTXO set updated (+12 / -8)",
    "Headers synced to #__HEIGHT__",
    "Relay: inv message from peer 7",
    "Compact block reconstructed",
  ],
  warn: [
    "Slow peer response (1.2s) from 91.220.131.18",
    "Orphan block detected, re-requesting parent",
    "High mempool backlog: 2,400 txs",
    "RPC timeout on getblocktemplate",
  ],
  error: [
    "Failed to connect to peer 203.0.113.50:8333",
    "Invalid block header checksum",
    "Deserialization error on tx abc123",
    "Database write failed: disk full",
  ],
  success: [
    "Block #__HEIGHT__ validated and stored",
    "Chain tip updated to #__HEIGHT__",
    "Reindex complete: 850,000 blocks",
    "Wallet balance synced: 1.42 BSV",
  ],
}

function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateEvent(height: number): SyncEvent {
  // Weighted level selection: mostly log, occasional warn/success, rare error
  const r = Math.random()
  let level: SyncEventLevel
  if (r < 0.6) level = "log"
  else if (r < 0.8) level = "warn"
  else if (r < 0.93) level = "success"
  else level = "error"

  const template = randomFrom(MESSAGES[level])
  const message = template.replace("__HEIGHT__", height.toLocaleString())

  return {
    timestamp: Date.now(),
    source: randomFrom(SOURCES),
    level,
    message,
  }
}

// ---------------------------------------------------------------------------
// Demo component
// ---------------------------------------------------------------------------

export default function SyncTerminalDemo() {
  const [events, setEvents] = useState<SyncEvent[]>([])
  const heightRef = useRef(850_000)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [running, setRunning] = useState(true)

  const tick = useCallback(() => {
    heightRef.current += 1
    const event = generateEvent(heightRef.current)
    setEvents((prev) => {
      const next = [...prev, event]
      return next.length > 200 ? next.slice(-200) : next
    })
  }, [])

  useEffect(() => {
    if (running) {
      // Fire a quick initial burst
      for (let i = 0; i < 8; i++) {
        heightRef.current += 1
        const event = generateEvent(heightRef.current)
        setEvents((prev) => [...prev, event])
      }

      intervalRef.current = setInterval(tick, 600)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, tick])

  const status: SyncStatus = {
    blockHeight: heightRef.current,
    connected: running,
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
      <SyncTerminalUI
        events={events}
        status={status}
        title="Sync Log"
        showTimestamps={true}
        showSource={true}
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setRunning((prev) => !prev)}
          className="rounded bg-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-700"
        >
          {running ? "Pause" : "Resume"}
        </button>
        <button
          type="button"
          onClick={() => setEvents([])}
          className="rounded bg-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-700"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
