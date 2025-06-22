Plan and create a new BigBlocks component or feature: "$ARGUMENTS"

## Purpose

This is a higher-level planning command that analyzes your requirements and determines:
1. What type of assets to create (component, block, provider, hook, etc.)
2. What dependencies and integrations are needed
3. What sensible defaults to apply
4. Which commands to chain together

## Step 1: Requirement Analysis

Analyze the user's request to understand:
- **Functionality**: What does it need to do?
- **Scope**: Single component or multiple related components?
- **State**: Does it need to share state with other components?
- **Integration**: Does it need Bitcoin auth, wallet, or social features?
- **Reusability**: Will it be used in multiple places?

## Step 2: Decision Tree

### Is it a full page or major section with multiple components?
**YES** → Create a **BLOCK**
- Example: "authentication flow", "wallet dashboard", "social feed page"
- Command: `/project:add-block [name]`
- Includes: Multiple components, layout, state management

**NO** → Continue to next question...

### Does it need to manage global state shared across the app?
**YES** → Create a **PROVIDER + HOOK**
- Example: "user preferences", "shopping cart", "notification system"
- Commands: 
  1. `/project:add-provider [name]-provider`
  2. `/project:add-hook use-[name]`

**NO** → Continue to next question...

### Does it need complex state management or business logic?
**YES** → Create **HOOK(S) + COMPONENT**
- Example: "form with validation", "data fetching with cache", "real-time updates"
- Commands:
  1. `/project:add-hook use-[name]`
  2. `/project:add-component [name]`

**NO** → Continue to next question...

### Is it a reusable UI element used in multiple places?
**YES** → Create a **COMPONENT**
- Example: "auth button", "user avatar", "balance display"
- Command: `/project:add-component [name]`

**NO** → Continue to next question...

### Is it a variation of an existing component?
**YES** → Create an **EXAMPLE**
- Example: "auth button with custom text", "profile card with extended info"
- Command: `/project:add-example [component-name]-[variant]`

**NO** → Create a simple **COMPONENT**

## Step 3: Integration Analysis

### Bitcoin Authentication Integration
If the component needs user authentication:
- ✅ Component will use `useBitcoinAuth()` hook
- ✅ Requires `BitcoinAuthProvider` at app level
- ✅ Handles backup types: BapMemberBackup, OneSatBackup, WifBackup
- ✅ Storage: Encrypted in localStorage, decrypted in sessionStorage

### Wallet Integration
If the component needs wallet features:
- ✅ Component will use `useWallet()` or specific hooks
- ✅ Requires `WalletProvider` at app level
- ✅ Handles balance, transactions, tokens
- ✅ Includes error handling for insufficient funds

### Social Integration
If the component needs social features:
- ✅ BMAP API integration for real blockchain data
- ✅ EventSource for real-time updates
- ✅ Handles posts, likes, follows, comments
- ✅ Includes pagination and error boundaries

## Step 4: Sensible Defaults

### Authentication Components
```typescript
// Default backup configuration
backupTypes: {
  enabled: ["BapMemberBackup", "OneSatBackup", "WifBackup"]
  // BapMasterBackup excluded by default for security
}

// Storage pattern
localStorage: encryptedBackup only
sessionStorage: decryptedBackup, paymentKey, ordinalKey
```

### Wallet Components
```typescript
// Default configuration
insufficientFundsMessage: "Insufficient funds for this transaction"
minAmount: 1 // satoshis
maxAmount: 21000000 // satoshis
refreshInterval: 30000 // 30 seconds
```

### Social Components
```typescript
// Default configuration
apiUrl: "https://bmap-api-production.up.railway.app"
pageSize: 20
realTimeUpdates: true
showLoadMore: true
```

### UI/Theme Defaults
```typescript
// Semantic colors only
colors: {
  primary: "bg-primary text-primary-foreground"
  secondary: "bg-secondary text-secondary-foreground"
  muted: "bg-muted text-muted-foreground"
  // Never hard-coded colors like bg-blue-500
}
```

## Step 5: Execution Plan

Based on the analysis, here's what will be created:

### For a Block (e.g., "authentication flow")
1. **Block structure**:
   ```
   blocks/auth-flow/
   ├── page.tsx          # Main layout
   ├── components/
   │   ├── signin.tsx    # Sign in form
   │   ├── signup.tsx    # Sign up form
   │   ├── backup.tsx    # Backup management
   │   └── oauth.tsx     # OAuth linking
   └── hooks/
       └── use-auth-flow.ts
   ```

2. **Dependencies**:
   - `registry:ui` components: button, card, form, dialog
   - `registry:lib`: BitcoinAuthProvider
   - NPM: bitcoin-backup, @bsv/sdk

### For a Component (e.g., "send BSV button")
1. **Component features**:
   - Amount input with validation
   - Recipient address validation
   - Transaction preview
   - Insufficient funds handling
   - Loading and success states

2. **Integration**:
   - Uses `useWallet()` for balance and sending
   - Uses `useBitcoinAuth()` for user context
   - Semantic theme colors

### For a Provider + Hook (e.g., "notification system")
1. **Provider features**:
   - Global notification queue
   - Auto-dismiss timers
   - Persistence options
   - Toast positioning

2. **Hook returns**:
   - `notify()` function
   - `notifications` array
   - `clearAll()` function
   - `dismiss(id)` function

## Step 6: Command Chaining

Execute the appropriate commands in order:

```bash
# Example for a wallet dashboard block:
1. /project:add-provider wallet-provider
2. /project:add-hook use-wallet
3. /project:add-component wallet-balance
4. /project:add-component send-bsv-button
5. /project:add-component transaction-history
6. /project:add-block wallet-dashboard
```

## Step 7: Post-Creation Checklist

After creating the assets:

- [ ] All TypeScript types properly defined (no `any`)
- [ ] Bitcoin backup types configured correctly
- [ ] Storage patterns follow session/local separation
- [ ] Theme uses semantic colors only
- [ ] Error handling for common scenarios
- [ ] Loading states implemented
- [ ] Documentation includes examples
- [ ] Tests cover main functionality

## Common Patterns

### Authentication Flow
```
Block: auth-flow
├── Provider: BitcoinAuthProvider (app-level)
├── Hook: useBitcoinAuth
├── Components:
│   ├── SignInForm
│   ├── SignUpForm
│   ├── BackupDownload
│   ├── BackupImport
│   └── OAuthLink
└── Examples: Various auth scenarios
```

### Wallet Features
```
Block: wallet-dashboard
├── Provider: WalletProvider (app-level)
├── Hooks:
│   ├── useWallet
│   ├── useBalance
│   └── useTransactions
├── Components:
│   ├── WalletOverview
│   ├── SendBSVButton
│   ├── ReceiveAddress
│   └── TransactionList
└── Examples: Different wallet layouts
```

### Social Features
```
Block: social-feed
├── Hooks:
│   ├── useSocialFeed
│   ├── useLikes
│   └── useComments
├── Components:
│   ├── PostList
│   ├── PostCard
│   ├── LikeButton
│   ├── CommentSection
│   └── ShareButton
└── Examples: Different feed types
```

## Next Steps

1. **Analyze the requirement** using the decision tree
2. **Identify integrations** needed (auth, wallet, social)
3. **Apply sensible defaults** for the component type
4. **Chain the appropriate commands** to create all assets
5. **Verify the implementation** matches BigBlocks patterns

Remember: The goal is to create components that work well out of the box with minimal configuration while still being flexible for customization.