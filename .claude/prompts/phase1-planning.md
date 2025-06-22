# Phase 1: Planning & Context Gathering

When planning a new BigBlocks component, follow these steps:

## 1. Analyze Requirements

### Determine Component Type
- **UI Component**: Interactive element with visual representation
- **Hook**: Logic-only, returns data and functions
- **Provider**: Global state management
- **Block**: Complete page section with multiple files
- **Library**: Non-visual utilities

### Identify Category
- authentication (Bitcoin auth, backup management)
- wallet (Send BSV, balance display, transactions)
- social (Posts, likes, follows, messaging)
- market (NFT listings, purchases)
- ui-components (Generic Bitcoin-themed UI elements)

## 2. Research Existing Patterns

### Check BigBlocks Reference Implementation
```bash
# Look for similar components
find ~/code/bigblocks/src/components -name "*${SIMILAR_COMPONENT}*"

# Check authentication patterns
cat ~/code/bigblocks/src/lib/AuthManager.ts

# Review backup handling
cat ~/code/bigblocks/src/lib/backup-utils.ts
```

### Check shadcn-ui Patterns
```bash
# Find base components to build on
ls /Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/ui/

# Check if similar components exist
grep -r "${COMPONENT_PATTERN}" /Users/satchmo/code/shadcn-ui/apps/www/registry/
```

## 3. Identify Dependencies

### shadcn-ui Components Needed
Review which shadcn components to use as building blocks:
- Form elements: input, button, select, checkbox
- Layout: card, sheet, dialog, tabs
- Feedback: alert, toast, skeleton
- Data display: table, badge, avatar

### NPM Dependencies
Common packages for BigBlocks components:
- `@bsv/sdk` - Bitcoin cryptography
- `bitcoin-auth` - Authentication
- `bitcoin-backup` - Backup management
- `bsv-bap` - BAP identity
- `satoshi-token` - BSV conversions

### Registry Dependencies
Other BigBlocks components this depends on:
- Provider dependencies (BitcoinAuthProvider, WalletProvider)
- Shared UI components
- Utility hooks

## 4. Define Component API

### Props Interface
```typescript
export interface ComponentProps {
  // Visual props
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
  
  // Behavioral props
  onSuccess?: (data: ResultType) => void
  onError?: (error: Error) => void
  
  // Configuration
  apiUrl?: string  // Default to auth.sigmaidentity.com
  allowedBackupTypes?: BackupTypeName[]
}
```

### Return Interface (for hooks)
```typescript
export interface UseComponentReturn {
  // State
  data: DataType | null
  isLoading: boolean
  error: Error | null
  
  // Actions  
  execute: (params: ParamType) => Promise<ResultType>
  reset: () => void
}
```

## 5. Plan State Management

### Determine State Location
- **Component state**: For UI-only state (open/closed, hover, etc.)
- **Provider access**: For auth, wallet, theme state
- **Shared atoms/stores**: For cross-component communication

### Storage Requirements
- Session storage: Temporary data, decrypted backups
- Local storage: Encrypted backups only
- Memory only: Sensitive unencrypted data

## 6. Consider Edge Cases

### Authentication States
- Not authenticated
- Authentication in progress
- Authentication failed
- Session expired

### Network Conditions
- Offline handling
- Slow connections
- API errors
- Rate limiting

### Browser Compatibility
- SSR compatibility
- Mobile responsiveness
- Reduced motion preferences
- Dark/light theme support

## 7. Document Integration Points

### With Auth System
- How does it interact with BitcoinAuthProvider?
- Does it need access to user profile?
- Should it auto-detect auth server?

### With Wallet System
- Does it need payment capabilities?
- Should it check wallet balance?
- Does it broadcast transactions?

### With Social Features
- Does it post to blockchain?
- Does it read from BMAP API?
- Should it support real-time updates?

## Output Format

After planning, document:
1. Component name and category
2. Dependencies list (shadcn, npm, registry)
3. Props/return interface
4. State management approach
5. Key implementation notes
6. Potential challenges