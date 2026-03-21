"use client"

import { useState } from "react"
import {
  OrdinalsGrid,
  type OrdinalOutput,
} from "@/registry/new-york/blocks/ordinals-grid"

const MOCK_ORDINALS: OrdinalOutput[] = [
  {
    outpoint:
      "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2_0",
    contentType: "image/png",
    name: "Rare Pepe #42",
    origin:
      "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2_0",
    satoshis: 1,
    tags: ["type:image/png", "name:Rare Pepe #42"],
  },
  {
    outpoint:
      "b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3_0",
    contentType: "image/webp",
    name: "1Sat Punk #1337",
    origin:
      "b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3_0",
    satoshis: 1,
    tags: ["type:image/webp", "name:1Sat Punk #1337"],
  },
  {
    outpoint:
      "c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4_0",
    contentType: "image/svg+xml",
    name: "Genesis Block Art",
    origin:
      "c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4_0",
    satoshis: 1,
    tags: ["type:image/svg+xml", "name:Genesis Block Art"],
  },
  {
    outpoint:
      "d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5_0",
    contentType: "application/json",
    origin:
      "d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5_0",
    satoshis: 1,
    tags: ["type:application/json"],
  },
  {
    outpoint:
      "e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6_0",
    contentType: "image/jpeg",
    name: "Sigma Identity Avatar",
    origin:
      "e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6_0",
    satoshis: 1,
    tags: ["type:image/jpeg", "name:Sigma Identity Avatar"],
  },
  {
    outpoint:
      "f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1_0",
    contentType: "text/plain",
    name: "On-Chain Note",
    origin:
      "f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1_0",
    satoshis: 1,
    tags: ["type:text/plain", "name:On-Chain Note"],
  },
]

export default function OrdinalsGridDemo() {
  const [selected, setSelected] = useState<OrdinalOutput | null>(null)

  return (
    <div className="space-y-4">
      <OrdinalsGrid
        ordinals={MOCK_ORDINALS}
        onSelect={setSelected}
      />
      {selected && (
        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="text-sm">
            <span className="font-medium">Selected:</span>{" "}
            {selected.name ?? "Unnamed"}{" "}
            <span className="font-mono text-xs text-muted-foreground">
              ({selected.outpoint.slice(0, 12)}...)
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
