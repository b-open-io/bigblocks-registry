"use client"

import {
  OrdinalsGridUI,
  type OrdinalsGridUIProps,
} from "./ordinals-grid-ui"
import {
  useOrdinalsGrid,
  type OrdinalOutput,
  type UseOrdinalsGridOptions,
  type UseOrdinalsGridReturn,
} from "./use-ordinals-grid"

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export {
  OrdinalsGridUI,
  type OrdinalsGridUIProps,
} from "./ordinals-grid-ui"
export {
  useOrdinalsGrid,
  type OrdinalOutput,
  type UseOrdinalsGridOptions,
  type UseOrdinalsGridReturn,
} from "./use-ordinals-grid"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OrdinalsGridProps {
  /** Ordinal address to fetch from the 1sat API */
  address?: string
  /** Pre-fetched ordinals to display (bypasses API fetch) */
  ordinals?: OrdinalOutput[]
  /** Base URL for the 1sat owner API */
  apiUrl?: string
  /** ORDFS base URL for content resolution (default: https://ordfs.network) */
  ordfsBase?: string
  /** Max number of items to display */
  limit?: number
  /** Called when an ordinal card is clicked */
  onSelect?: (ordinal: OrdinalOutput) => void
  /** Called when the Transfer action is triggered on an ordinal */
  onTransfer?: (ordinal: OrdinalOutput) => void
  /** Called when the List action is triggered on an ordinal */
  onList?: (ordinal: OrdinalOutput) => void
  /** Called when the View Detail action is triggered on an ordinal */
  onDetail?: (ordinal: OrdinalOutput) => void
  /** Called when an external link action is triggered. Receives the URL string. */
  onExternalLink?: (url: string) => void
  /** Whether to show the item count header (default: true) */
  showCount?: boolean
  /** Whether to wrap the grid in a ScrollArea (default: false) */
  scrollable?: boolean
  /** Max height for the scroll area when scrollable is true */
  maxHeight?: string
  /** Additional CSS classes */
  className?: string
}

// ---------------------------------------------------------------------------
// Composed component
// ---------------------------------------------------------------------------

/**
 * Responsive grid of owned ordinal NFTs with ORDFS thumbnails.
 *
 * Supply either an `address` to auto-fetch from the 1sat API, or pass
 * pre-fetched `ordinals` directly. Each card displays the inscription
 * image, name, content type badge, and truncated outpoint.
 *
 * @example
 * ```tsx
 * import { OrdinalsGrid } from "@/components/blocks/ordinals-grid"
 *
 * // Fetch from address
 * <OrdinalsGrid
 *   address="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
 *   onSelect={(ordinal) => console.log("Selected:", ordinal.outpoint)}
 * />
 *
 * // Or pass pre-fetched ordinals
 * <OrdinalsGrid
 *   ordinals={myOrdinals}
 *   onSelect={(ordinal) => router.push(`/ordinal/${ordinal.outpoint}`)}
 * />
 * ```
 */
export function OrdinalsGrid({
  address,
  ordinals,
  apiUrl,
  ordfsBase,
  limit,
  onSelect,
  onTransfer,
  onList,
  onDetail,
  onExternalLink,
  showCount,
  scrollable,
  maxHeight,
  className,
}: OrdinalsGridProps) {
  const grid = useOrdinalsGrid({ address, ordinals, apiUrl, limit })

  return (
    <OrdinalsGridUI
      items={grid.items}
      isLoading={grid.isLoading}
      error={grid.error}
      count={grid.count}
      onSelect={onSelect}
      onTransfer={onTransfer}
      onList={onList}
      onDetail={onDetail}
      onExternalLink={onExternalLink}
      ordfsBase={ordfsBase}
      showCount={showCount}
      scrollable={scrollable}
      maxHeight={maxHeight}
      className={className}
    />
  )
}
