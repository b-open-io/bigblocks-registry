"use client"

import { useState } from "react"
import {
  OrdinalsGrid,
  type OrdinalOutput,
} from "@/registry/bigblocks/blocks/ordinals-grid"

const MOCK_ORDINALS: OrdinalOutput[] = [
  {
    outpoint:
      "1611d956f397caa80b56bc148b4bce87b54f39b234aeca4668b4d5a7785eb9fa_0",
    contentType: "image/png",
    name: "Pixel Foxes",
    origin:
      "1611d956f397caa80b56bc148b4bce87b54f39b234aeca4668b4d5a7785eb9fa_0",
    satoshis: 1,
    tags: ["type:image/png", "name:Pixel Foxes"],
  },
  {
    outpoint:
      "87459ead23591c06e2e06de62051e2265c6697dad8647d0aaba4933265ad5dba_0",
    contentType: "image/webp",
    name: "Crypto Adventure",
    origin:
      "87459ead23591c06e2e06de62051e2265c6697dad8647d0aaba4933265ad5dba_0",
    satoshis: 1,
    tags: ["type:image/webp", "name:Crypto Adventure"],
  },
  {
    outpoint:
      "0d2b430030ab8480a430a300e0393d107b3754bce4d98bf919c39f0e752b6746_0",
    contentType: "image/png",
    name: "TestyPepes",
    origin:
      "0d2b430030ab8480a430a300e0393d107b3754bce4d98bf919c39f0e752b6746_0",
    satoshis: 1,
    tags: ["type:image/png", "name:TestyPepes"],
  },
  {
    outpoint:
      "8664fcbca0d1b6c6e2323b42434d90b57be562b6c49bc1f266a7fa23bb8edc19_0",
    contentType: "image/png",
    name: "Aym the GM",
    origin:
      "8664fcbca0d1b6c6e2323b42434d90b57be562b6c49bc1f266a7fa23bb8edc19_0",
    satoshis: 1,
    tags: ["type:image/png", "name:Aym the GM"],
  },
  {
    outpoint:
      "3265e1cfee59754a6e9e3e473fc8dbbf7bf0ebb7a50d97d00c0870fb27b934b2_0",
    contentType: "image/jpeg",
    name: "SNOW",
    origin:
      "3265e1cfee59754a6e9e3e473fc8dbbf7bf0ebb7a50d97d00c0870fb27b934b2_0",
    satoshis: 1,
    tags: ["type:image/jpeg", "name:SNOW"],
  },
  {
    outpoint:
      "94f664c15f3f8a5f2930a053381b4b94e264c77434cd99b49b03734f7862bc6e_0",
    contentType: "image/jpeg",
    name: "The Pepeverse",
    origin:
      "94f664c15f3f8a5f2930a053381b4b94e264c77434cd99b49b03734f7862bc6e_0",
    satoshis: 1,
    tags: ["type:image/jpeg", "name:The Pepeverse"],
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
