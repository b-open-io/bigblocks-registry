# Shared Context for BigBlocks Registry

This document contains shared rules, patterns, and guidelines used across all BigBlocks registry commands.

## Critical Rules

### Type Safety (MANDATORY)
1. **NEVER use `any`, `unknown`, or type casting**
   - NO `as` type assertions
   - NO `@ts-ignore` (except for documented third-party library issues)
   - NO `@ts-expect-error` (except for documented third-party library issues)
2. **ALL types must be properly imported and traced**
   - If unsure of types, use Read tool to check imported type definitions
   - Trace types back to their source files in BigBlocks
   - Generic types must have proper constraints
3. **Type checking is mandatory**
   - Run before committing: `cd apps/showcase && bunx tsc --noEmit`
   - Run before committing: `cd apps/registry && bunx tsc --noEmit`

### Component Development Rules
1. **Only add CUSTOM BigBlocks components/blocks** - NEVER add standard shadcn-ui components
2. **Always BUILD components using:**
   - shadcn-ui components first
   - Radix UI primitives second (if no shadcn alternative)
3. **All imports must use** `@/components/ui/*` for installed components
4. **Check shadcn-ui reference**: Always look at `/Users/satchmo/code/shadcn-ui` for patterns

### Theme Compatibility (Required)
All components must use semantic color classes:
- `bg-primary text-primary-foreground`
- `bg-secondary text-secondary-foreground`
- `bg-muted text-muted-foreground`
- `bg-accent text-accent-foreground`
- `bg-destructive text-destructive-foreground`
- `border-border`, `ring-ring`

**NEVER use hard-coded colors** like `bg-green-500` or `bg-blue-600`.

## File Structure

```
apps/registry/registry/new-york/
├── ui/               # Components (registry:ui)
├── hooks/            # Hooks (registry:hook)
├── providers/        # App-level providers (registry:lib)
├── blocks/           # Page blocks (registry:block)
├── examples/         # Demos (registry:example)
├── lib/              # Libraries (registry:lib)
└── themes/           # Color themes (registry:theme)
```

## State Management Architecture

Following shadcn-ui patterns:
- **App-level providers**: For global state (auth, wallet, theme)
- **Component-level providers**: Embedded for component-specific state
- **Shared state**: Use Jotai atoms or Zustand stores
- **No provider duplication**: Each provider has one instance

## Import Path Conventions
- Components/Hooks: `@/components/ui/*` or `@/hooks/*`
- Libraries: `@/lib/*`
- Types: `@/lib/types`
- Never use relative imports for registry items

## SSR/Client Rules

### "use client" Decision Tree:
1. **Does it use hooks (useState, useEffect, etc.)?** → Add "use client"
2. **Does it have event handlers (onClick, onChange)?** → Add "use client"
3. **Does it use browser APIs (window, document)?** → Add "use client"
4. **Does it use Context?** → Add "use client"
5. **Is it pure presentational with no interactivity?** → No "use client" needed

### Browser API Safety:
- If using window/document: `if (typeof window !== "undefined")`
- If using localStorage: Check availability first
- Document SSR compatibility in MDX

## Valid BigBlocks Categories

### Components:
- **authentication**: AuthButton, LoginForm, DeviceLinkQR, SignupFlow, OAuthRestoreFlow
- **wallet**: SendBSVButton, WalletOverview, TokenBalance, DonateButton
- **social**: PostButton, SocialFeed, LikeButton, FollowButton, MessageDisplay
- **market**: CreateListingButton, MarketTable, BuyListingButton, CancelListingButton
- **ui-components**: StepIndicator, QRCodeRenderer, TransactionProgress, ErrorDisplay

### Hooks:
- **authentication**: useBitcoinAuth, useOAuthRestore, useDeviceLink, usePasswordValidation
- **wallet**: useSendBSV, useWalletBalance, useTokenOperations, useTransactionStatus
- **social**: useSocialFeed, useLikePost, useFollowUser, useFriends, useChannels
- **market**: useMarketplace, useCreateListing, useBuyListing, useCancelListing
- **utility**: useBlockchainService, useCopyToClipboard, useDebounce

## Testing Checklist

Before committing any new asset:

```bash
# Type checking (MANDATORY)
cd apps/showcase && bunx tsc --noEmit
cd apps/registry && bunx tsc --noEmit

# Check for any usage
grep -r "\bany\b" [your-files]

# Linting
cd apps/showcase && bun run lint
cd apps/registry && bun run lint

# Build test
cd apps/showcase && bun run build

# Registry build
cd apps/registry && bun registry:build
```

## Available shadcn-ui Components

accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, checkbox, collapsible, combobox, command, context-menu, data-table, date-picker, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toggle, toggle-group, tooltip

## Dependencies
- `dependencies`: NPM packages needed
- `registryDependencies`: Other BigBlocks/shadcn components needed
- Examples only use `registryDependencies`

## Reference Implementations

### shadcn-ui patterns:
- Components: `/Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/ui/`
- Hooks: `/Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/hooks/`
- Blocks: `/Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/blocks/`
- Themes: `/Users/satchmo/code/shadcn-ui/apps/www/registry/registry-themes.ts`

### BigBlocks specific:
- Bitcoin Auth System: `~/code/bigblocks/src/lib/AuthManager.ts`
- Backup Utilities: `~/code/bigblocks/src/lib/backup-utils.ts`
- Storage Patterns: `~/code/bigblocks/src/lib/storage-keys.ts`
- Sensible Defaults: `.claude/commands/sensible-defaults.md`