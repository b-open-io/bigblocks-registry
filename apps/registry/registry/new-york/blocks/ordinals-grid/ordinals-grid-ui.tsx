"use client"

import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ImageOff,
  Grid2x2,
  ArrowRightLeft,
  Tag,
  Eye,
  ExternalLink,
} from "lucide-react"
import type { OrdinalOutput } from "./use-ordinals-grid"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_ORDFS_BASE = "https://ordfs.network"

/** Number of skeleton cards to show during loading */
const SKELETON_COUNT = 8

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OrdinalsGridUIProps {
  /** Ordinal items to display */
  items: OrdinalOutput[]
  /** Whether the grid is in a loading state */
  isLoading: boolean
  /** Error to display */
  error: Error | null
  /** Total count of items */
  count: number
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
  /** ORDFS base URL for content resolution (default: https://ordfs.network) */
  ordfsBase?: string
  /** Whether to show the item count header (default: true) */
  showCount?: boolean
  /** Whether to wrap the grid in a ScrollArea (default: false) */
  scrollable?: boolean
  /** Max height for the scroll area when scrollable is true */
  maxHeight?: string
  /** Additional CSS classes for the root container */
  className?: string
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface OrdinalThumbnailProps {
  origin: string
  name: string | undefined
  outpoint: string
  ordfsBase: string
}

function OrdinalThumbnail({ origin, name, outpoint, ordfsBase }: OrdinalThumbnailProps) {
  const [hasError, setHasError] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)

  const handleError = useCallback(() => {
    setHasError(true)
    setIsImageLoading(false)
  }, [])

  const handleLoad = useCallback(() => {
    setIsImageLoading(false)
  }, [])

  const alt = name ?? `Ordinal ${outpoint.slice(0, 8)}...`
  const src = `${ordfsBase}/content/${origin}`

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <ImageOff
          className="size-8 text-muted-foreground/50"
          aria-hidden="true"
        />
      </div>
    )
  }

  return (
    <>
      {isImageLoading && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full object-cover transition-transform duration-200 group-hover:scale-105",
          isImageLoading && "invisible",
        )}
        loading="lazy"
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  )
}

interface OrdinalCardProps {
  ordinal: OrdinalOutput
  onSelect?: (ordinal: OrdinalOutput) => void
  onTransfer?: (ordinal: OrdinalOutput) => void
  onList?: (ordinal: OrdinalOutput) => void
  onDetail?: (ordinal: OrdinalOutput) => void
  onExternalLink?: (url: string) => void
  ordfsBase: string
}

function OrdinalCard({
  ordinal,
  onSelect,
  onTransfer,
  onList,
  onDetail,
  onExternalLink,
  ordfsBase,
}: OrdinalCardProps) {
  const truncatedOutpoint =
    ordinal.outpoint.length > 16
      ? `${ordinal.outpoint.slice(0, 8)}...${ordinal.outpoint.slice(-6)}`
      : ordinal.outpoint

  const hasActions = !!onTransfer || !!onList || !!onDetail || !!onExternalLink

  const handleClick = useCallback(() => {
    onSelect?.(ordinal)
  }, [ordinal, onSelect])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onSelect?.(ordinal)
      }
    },
    [ordinal, onSelect],
  )

  const handleTransfer = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onTransfer?.(ordinal)
    },
    [ordinal, onTransfer],
  )

  const handleList = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onList?.(ordinal)
    },
    [ordinal, onList],
  )

  const handleDetail = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onDetail?.(ordinal)
    },
    [ordinal, onDetail],
  )

  const handleExternalLink = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      const txid = ordinal.outpoint.split("_")[0]
      onExternalLink?.(`https://whatsonchain.com/tx/${txid}`)
    },
    [ordinal.outpoint, onExternalLink],
  )

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-200",
        "hover:shadow-md hover:border-primary/30",
        onSelect && "cursor-pointer",
      )}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={
        ordinal.name
          ? `Ordinal: ${ordinal.name}`
          : `Ordinal ${truncatedOutpoint}`
      }
      onClick={onSelect ? handleClick : undefined}
      onKeyDown={onSelect ? handleKeyDown : undefined}
    >
      <div className="relative aspect-square overflow-hidden bg-muted/50">
        <OrdinalThumbnail
          origin={ordinal.origin}
          name={ordinal.name}
          outpoint={ordinal.outpoint}
          ordfsBase={ordfsBase}
        />
        {/* Action overlay — only rendered when at least one action callback is provided */}
        {hasActions && (
          <div
            className={cn(
              "absolute inset-0 flex items-end justify-center gap-1.5 p-2",
              "bg-background/60 opacity-0 transition-opacity duration-200",
              "group-hover:opacity-100 focus-within:opacity-100",
            )}
          >
            {onDetail && (
              <Button
                variant="secondary"
                size="icon"
                className="size-8"
                onClick={handleDetail}
                aria-label={`View details for ${ordinal.name ?? truncatedOutpoint}`}
              >
                <Eye data-icon className="size-3.5" />
              </Button>
            )}
            {onTransfer && (
              <Button
                variant="secondary"
                size="icon"
                className="size-8"
                onClick={handleTransfer}
                aria-label={`Transfer ${ordinal.name ?? truncatedOutpoint}`}
              >
                <ArrowRightLeft data-icon className="size-3.5" />
              </Button>
            )}
            {onList && (
              <Button
                variant="secondary"
                size="icon"
                className="size-8"
                onClick={handleList}
                aria-label={`List ${ordinal.name ?? truncatedOutpoint}`}
              >
                <Tag data-icon className="size-3.5" />
              </Button>
            )}
            {onExternalLink && (
              <Button
                variant="secondary"
                size="icon"
                className="size-8"
                onClick={handleExternalLink}
                aria-label={`View ${ordinal.name ?? truncatedOutpoint} on explorer`}
              >
                <ExternalLink data-icon className="size-3.5" />
              </Button>
            )}
          </div>
        )}
      </div>
      <CardContent className="flex flex-col gap-1.5 p-3">
        {ordinal.name ? (
          <p className="truncate text-sm font-medium leading-none">
            {ordinal.name}
          </p>
        ) : (
          <p className="truncate text-sm font-medium leading-none text-muted-foreground">
            Unnamed
          </p>
        )}
        <div className="flex items-center justify-between gap-2">
          {ordinal.contentType && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {ordinal.contentType.split("/").pop()}
            </Badge>
          )}
          <span className="truncate text-[11px] font-mono text-muted-foreground">
            {truncatedOutpoint}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-square w-full rounded-none" />
          <div className="flex flex-col gap-2 p-3">
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
        <Grid2x2
          className="size-6 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      <p className="text-sm font-medium text-muted-foreground">
        No ordinals found
      </p>
      <p className="mt-1 text-xs text-muted-foreground/70">
        Ordinals owned by this address will appear here
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

interface ErrorStateProps {
  error: Error
}

function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-sm font-medium text-destructive">
        Failed to load ordinals
      </p>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">
        {error.message}
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main UI component
// ---------------------------------------------------------------------------

export function OrdinalsGridUI({
  items,
  isLoading,
  error,
  count,
  onSelect,
  onTransfer,
  onList,
  onDetail,
  onExternalLink,
  ordfsBase = DEFAULT_ORDFS_BASE,
  showCount = true,
  scrollable = false,
  maxHeight = "600px",
  className,
}: OrdinalsGridUIProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        {showCount && <Skeleton className="h-5 w-24" />}
        <SkeletonGrid />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={className}>
        <ErrorState error={error} />
      </div>
    )
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div className={className}>
        <EmptyState />
      </div>
    )
  }

  const gridContent = (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {items.map((ordinal) => (
        <OrdinalCard
          key={ordinal.outpoint}
          ordinal={ordinal}
          onSelect={onSelect}
          onTransfer={onTransfer}
          onList={onList}
          onDetail={onDetail}
          onExternalLink={onExternalLink}
          ordfsBase={ordfsBase}
        />
      ))}
    </div>
  )

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {showCount && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            {count} Ordinal{count !== 1 ? "s" : ""}
          </h3>
        </div>
      )}
      {scrollable ? (
        <ScrollArea style={{ maxHeight }}>{gridContent}</ScrollArea>
      ) : (
        gridContent
      )}
    </div>
  )
}
