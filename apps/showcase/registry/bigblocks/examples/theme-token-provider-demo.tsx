"use client"

import {
  ThemeTokenProvider,
  ThemeTokenSettings,
} from "@/registry/bigblocks/blocks/theme-token-provider"

/**
 * Demo showing the ThemeTokenProvider and ThemeTokenSettings panel.
 *
 * Enter an on-chain ThemeToken origin to fetch and apply the theme.
 * The provider persists the selection to localStorage.
 */
export default function ThemeTokenProviderDemo() {
  return (
    <ThemeTokenProvider
      onThemeApplied={(origin) =>
        console.log("[ThemeToken] Applied:", origin)
      }
      onThemeCleared={() => console.log("[ThemeToken] Cleared")}
    >
      <div className="flex flex-col items-center gap-4 p-4">
        <ThemeTokenSettings
          onApply={(origin) =>
            console.log("[Demo] Theme applied:", origin)
          }
          onClear={() => console.log("[Demo] Theme cleared")}
        />
      </div>
    </ThemeTokenProvider>
  )
}
