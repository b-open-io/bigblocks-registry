# BigBlocks Sensible Defaults

This document outlines the default configurations and patterns that make BigBlocks components work well out of the box. These defaults are based on the reference implementation at `~/code/bigblocks` and real-world usage patterns.

## Authentication Defaults

### Backup Types
```typescript
// Default allowed backup types (BapMasterBackup excluded for security)
export const DEFAULT_ALLOWED_BACKUP_TYPES: BackupTypeName[] = [
  "BapMemberBackup",  // Recommended for standard auth
  "OneSatBackup",     // Full wallet features
  "WifBackup"         // Simple authentication
]
```

### Password Requirements
```typescript
export const PASSWORD_DEFAULTS = {
  minLength: 8,
  requireSpecialChar: false,  // Keep it simple
  requireNumber: false,       // User-friendly
  requireUppercase: false,    // Avoid complexity
}
```

### Storage Configuration
```typescript
export const STORAGE_DEFAULTS = {
  // Session storage keys (temporary)
  session: {
    decryptedBackup: "decryptedBackup",
    paymentKey: "paymentKey",
    ordinalKey: "ordinalKey",
    oauthState: "oauthState",
    backupSource: "backupSource", // "imported" or "generated"
  },
  // Local storage keys (persistent, encrypted only)
  persistent: {
    encryptedBackup: "encryptedBackup",
    bapRotationPrefix: "bap-rotation-", // + idKey
  },
  // Namespace for multi-environment
  namespace: process.env.NODE_ENV || "production"
}
```

### API Configuration (Works with auth.sigmaidentity.com out of the box!)
```typescript
export const API_DEFAULTS = {
  // Default API server
  apiUrl: "https://auth.sigmaidentity.com",
  
  // Authentication endpoints
  endpoints: {
    auth: "/api/auth",              // Bitcoin signature auth
    backup: "/backup",              // Backup storage
    restore: "/backup",             // Backup retrieval
    session: "/api/auth/session",   // Session info
    signout: "/api/auth/signout",   // Sign out
  },
  
  // Request configuration for Bitcoin auth
  headers: {
    "X-Auth-Token": "{signature}",   // Bitcoin signature (not Bearer token)
    "Content-Type": "application/json",
  },
  
  // Bitcoin authentication settings
  auth: {
    requestPath: "/api/auth",        // Path used for signature generation
    timePadMs: 300000,               // 5-minute time window (300000ms)
    includeBody: true,               // Include request body in signature
  },
}
```

### Error Messages
```typescript
export const AUTH_ERROR_MESSAGES = {
  noBackup: "No backup found. Please sign up first.",
  invalidPassword: "Invalid password. Please try again.",
  unsupportedBackup: "This backup type is not supported.",
  networkError: "Network error. Please check your connection.",
  sessionExpired: "Your session has expired. Please sign in again.",
  oauthError: "Authentication failed. Please try again.",
  oauthCancelled: "Authentication was cancelled.",
}
```

## Wallet Defaults

### Transaction Limits
```typescript
export const TRANSACTION_DEFAULTS = {
  minAmount: 1,                    // 1 satoshi minimum
  maxAmount: 2100000000000000, // 21M BSV in satoshis
  defaultFee: 50,                  // 50 satoshis
  feePerByte: 0.5,                // 0.5 sat/byte
  dustLimit: 546,                 // Standard dust limit
}
```

### Balance Display
```typescript
export const BALANCE_DEFAULTS = {
  refreshInterval: 30000,          // 30 seconds
  showFiat: true,                 // Show USD equivalent
  fiatCurrency: "USD",            // Default currency
  decimals: 8,                    // Satoshi precision
  groupingSeparator: ",",         // 1,000,000
  decimalSeparator: ".",          // 0.00000001
}
```

### Error Handling
```typescript
export const WALLET_ERROR_MESSAGES = {
  insufficientFunds: "Insufficient funds for this transaction",
  invalidAddress: "Invalid Bitcoin address",
  amountTooSmall: "Amount is below dust limit (546 satoshis)",
  networkError: "Unable to broadcast transaction",
  feeEstimationError: "Unable to estimate fee",
}
```

## Social Features Defaults

### BMAP API Configuration
```typescript
export const SOCIAL_DEFAULTS = {
  apiUrl: "https://bmap-api-production.up.railway.app",
  pageSize: 20,                   // Items per page
  maxRetries: 3,                  // API retry attempts
  retryDelay: 1000,              // 1 second between retries
  cacheTimeout: 300000,          // 5 minutes cache
  realTimeUpdates: true,         // EventSource enabled
}
```

### Content Limits
```typescript
export const CONTENT_DEFAULTS = {
  maxPostLength: 280,            // Twitter-like limit
  maxCommentLength: 1000,        // Longer for comments
  maxTagLength: 32,              // Hashtag length
  maxMentions: 10,               // Per post
  maxMediaSize: 10_485_760,      // 10MB
  allowedMediaTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
}
```

### Feed Configuration
```typescript
export const FEED_DEFAULTS = {
  initialLoadCount: 20,          // First load
  scrollLoadCount: 10,           // Infinite scroll
  showLoadMore: true,            // Load more button
  autoRefresh: false,            // Manual refresh only
  showTimestamps: true,          // Relative times
  showLikeCount: true,          // Engagement metrics
  showReplyCount: true,         // Thread indicators
}
```

## UI/Theme Defaults

### Semantic Colors (Required)
```typescript
// NEVER use hard-coded colors like bg-blue-500
export const COLOR_CLASSES = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  muted: "bg-muted text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  border: "border-border",
  ring: "ring-ring",
}
```

### Layout Constants
```typescript
export const LAYOUT_DEFAULTS = {
  // Container widths
  containerSm: "640px",
  containerMd: "768px",
  containerLg: "1024px",
  containerXl: "1280px",
  
  // Spacing (8px grid)
  spacing: {
    xs: "0.5rem",   // 8px
    sm: "1rem",     // 16px
    md: "1.5rem",   // 24px
    lg: "2rem",     // 32px
    xl: "3rem",     // 48px
  },
  
  // Border radius
  radius: {
    sm: "0.25rem",  // 4px
    md: "0.5rem",   // 8px
    lg: "0.75rem",  // 12px
    full: "9999px", // Pill shape
  },
}
```

### Animation Defaults
```typescript
export const ANIMATION_DEFAULTS = {
  duration: {
    fast: 150,      // Hover effects
    normal: 300,    // Transitions
    slow: 500,      // Page transitions
  },
  easing: "cubic-bezier(0.4, 0, 0.2, 1)", // Smooth ease
  reducedMotion: true, // Respect user preference
}
```

## Component-Specific Defaults

### AuthButton
```typescript
export const AUTH_BUTTON_DEFAULTS = {
  variant: "default",
  size: "default",
  showAvatar: true,
  showName: true,
  showDropdown: true,
  signInText: "Sign In",
  signOutText: "Sign Out",
  loadingText: "Loading...",
  
  // Auth server detection
  detectAuthServer: true,              // Auto-detect if running on auth server
  apiUrl: "https://auth.sigmaidentity.com", // Default auth server
  enableOAuth: true,                   // Support OAuth token flows
}
```

### SendBSVButton
```typescript
export const SEND_BSV_DEFAULTS = {
  variant: "default",
  size: "default",
  confirmRequired: true,
  showPreview: true,
  showFeeEstimate: true,
  defaultMemo: "",
  memoMaxLength: 100,
}
```

### ProfileCard
```typescript
export const PROFILE_CARD_DEFAULTS = {
  showAvatar: true,
  showBio: true,
  showStats: true,
  showActions: true,
  avatarSize: "md",
  maxBioLength: 160,
}
```

## Provider Defaults

### BitcoinAuthProvider
```typescript
export const AUTH_PROVIDER_DEFAULTS = {
  // Default to auth.sigmaidentity.com
  apiUrl: "https://auth.sigmaidentity.com",
  
  // Session management
  sessionTimeout: 86400000,      // 24 hours
  refreshThreshold: 3600000,     // 1 hour before expiry
  autoRefresh: true,             // Refresh tokens
  persistSession: true,          // Remember user
  secureStorage: true,           // Encrypt everything
  
  // Bitcoin authentication settings
  auth: {
    requestPath: "/api/auth",    // Path for signature generation
    timePadMs: 300000,           // 5-minute time window
    includeBody: true,           // Sign request body
    headerName: "X-Auth-Token",  // Auth header name
  },
  
  // OAuth token support (built on Bitcoin auth)
  oauth: {
    enabled: true,               // Enable OAuth token flows
    autoDetect: true,           // Auto-detect OAuth context
    provider: "sigma",          // Provider identifier
  },
}
```

### WalletProvider
```typescript
export const WALLET_PROVIDER_DEFAULTS = {
  network: "mainnet",           // Production by default
  indexerUrl: "https://api.whatsonchain.com/v1/bsv/main",
  broadcastUrl: "https://api.whatsonchain.com/v1/bsv/main/tx/raw",
  feeApi: "https://api.whatsonchain.com/v1/bsv/main/fee/quotes",
  utxoLimit: 100,              // Max UTXOs to fetch
  confirmations: 1,            // Required confirmations
}
```

## Development vs Production

### Environment-Specific Defaults
```typescript
export const getEnvironmentDefaults = () => {
  const isDevelopment = process.env.NODE_ENV === "development"
  
  return {
    storage: {
      namespace: isDevelopment ? "dev" : "prod",
      clearOnError: isDevelopment,
    },
    api: {
      timeout: isDevelopment ? 30000 : 10000, // Longer in dev
      retries: isDevelopment ? 1 : 3,
      baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
    },
    logging: {
      enabled: isDevelopment,
      level: isDevelopment ? "debug" : "error",
    },
  }
}
```

## Auth Server Detection Logic

### How Components Detect Auth Context
```typescript
export const detectAuthContext = () => {
  const params = new URLSearchParams(window.location.search)
  const currentUrl = window.location.origin
  
  return {
    // Running on auth server
    isAuthServer: currentUrl.includes('auth.sigmaidentity.com') ||
                  currentUrl.includes('auth-staging.sigmaidentity.com') ||
                  currentUrl.includes('auth.'),
    
    // OAuth callback detection
    isOAuthCallback: params.has('code') || params.has('state'),
    
    // OAuth authorization request
    isOAuthRequest: params.has('client_id') && params.has('redirect_uri'),
    
    // OAuth parameters
    clientId: params.get('client_id'),
    redirectUri: params.get('redirect_uri'),
    state: params.get('state'),
    code: params.get('code'),
    provider: params.get('provider') || 'sigma',
  }
}
```

### Component Behavior Based on Context
```typescript
// AuthButton automatically adapts:
const authContext = detectAuthContext()

if (authContext.isAuthServer) {
  // On auth server: Show embedded Bitcoin auth flow
  return <BitcoinAuthFlow />
} else if (authContext.isOAuthCallback) {
  // Handle OAuth token exchange
  handleOAuthCallback(authContext.code, authContext.state)
} else if (authContext.isOAuthRequest) {
  // OAuth authorization request - redirect to auth server
  const authUrl = buildOAuthAuthUrl(config.apiUrl, authContext)
  window.location.href = authUrl
} else {
  // Normal app: direct Bitcoin auth or redirect
  return <StandardAuthButton />
}
```

## Centralized Messages

### Auth Messages
```typescript
export const AUTH_MESSAGES = {
  // General
  loading: "Loading...",
  error: "An error occurred",
  success: "Success",
  cancel: "Cancel",
  back: "Back",
  continue: "Continue",

  // Auth States
  signIn: "Sign In with Bitcoin",
  signUp: "Create Bitcoin Account",
  signOut: "Sign Out",

  // Login Form
  loginTitle: "Sign In",
  loginSubtitle: "Sign in with your Bitcoin identity",
  loginButton: "Sign In",
  loginPasswordPlaceholder: "Enter your password",
  loginNoAccount: "Don't have an account?",
  loginForgotPassword: "Forgot password?",

  // Signup Flow
  signupTitle: "Create Account",
  signupSubtitle: "Create a new Bitcoin identity",
  signupButton: "Create Account",
  signupAlreadyHaveAccount: "Already have an account?",
  signupGeneratingIdentity: "Generating your Bitcoin identity...",
  signupBackupWarning: "Save your backup file in a secure location",
  signupMnemonicWarning: "Write down these words in order and store them safely",

  // Backup
  backupTitle: "Save Your Backup",
  backupDownloadButton: "Download Backup",
  backupImportButton: "Import Backup",
  generateBackup: "Generate New BAP Identity",
  importBackup: "Import Existing Identity",

  // Password
  passwordLabel: "Password",
  passwordPlaceholder: "Create a strong password",
  passwordConfirmLabel: "Confirm Password",
  passwordConfirmPlaceholder: "Confirm your password",
  passwordMismatch: "Passwords don't match",
  passwordTooShort: "Password must be at least 8 characters",
  passwordRequired: "Password is required",

  // Errors
  noBackup: "No backup found. Please sign up first.",
  invalidPassword: "Invalid password. Please try again.",
  unsupportedBackup: "This backup type is not supported.",
  networkError: "Network error. Please check your connection.",
  sessionExpired: "Your session has expired. Please sign in again.",
}
```

## Usage in Components

### Real Backup Generation
```typescript
// generateNewBackup function
import { HD, Mnemonic } from "@bsv/sdk"
import { BAP } from "bsv-bap"
import type { BapMasterBackup } from "@/lib/types"

function generateNewBackup(): BapMasterBackup {
  const mnemonic = Mnemonic.fromRandom()
  const seed = mnemonic.toSeed()
  const hdKey = HD.fromSeed(seed)
  const xprv = hdKey.toString()
  
  const bap = new BAP(xprv)
  bap.newId() // Create root identity
  const ids = bap.exportIds()
  
  return {
    xprv,
    mnemonic: mnemonic.toString(),
    ids
  }
}
```

### Real User Creation
```typescript
// createUserFromBackup function
import { BAP } from "bsv-bap"
import { PrivateKey } from "@bsv/sdk"
import { detectBackupType } from "@/lib/backup-utils"
import type { AuthUser, BapMasterBackup, BapMemberBackup, OneSatBackup, WifBackup } from "@/lib/types"

function createUserFromBackup(backup: BapMasterBackup | BapMemberBackup | OneSatBackup | WifBackup): AuthUser {
  const backupType = detectBackupType(backup)
  
  switch (backupType) {
    case "BapMasterBackup":
      const bap = new BAP(backup.xprv)
      bap.importIds(backup.ids)
      const identity = backup.ids[0]
      
      return {
        id: identity.identityKey,
        address: identity.rootAddress,
        idKey: identity.identityKey,
        profiles: [{
          id: identity.identityKey,
          address: identity.rootAddress,
          isPublished: false
        }],
        activeProfileId: identity.identityKey
      }
    
    case "OneSatBackup":
      return {
        id: backup.identityPk,
        address: backup.paymentAddress,
        idKey: backup.identityPk,
        profiles: [{
          id: backup.identityPk,
          address: backup.paymentAddress,
          isPublished: false
        }],
        activeProfileId: backup.identityPk
      }
    
    case "BapMemberBackup":
      return {
        id: backup.identityKey,
        address: backup.address,
        idKey: backup.identityKey,
        profiles: [{
          id: backup.identityKey,
          address: backup.address,
          isPublished: false
        }],
        activeProfileId: backup.identityKey
      }
    
    case "WifBackup":
      // For WIF backup, derive address and create basic profile
      const privateKey = PrivateKey.fromWif(backup.wif)
      const address = privateKey.toPublicKey().toAddress()
      
      return {
        id: address,
        address,
        idKey: address,
        profiles: [{
          id: address,
          address,
          isPublished: false
        }],
        activeProfileId: address
      }
    
    default:
      throw new Error(`Unsupported backup type: ${backupType}`)
  }
}
```

### Applying Defaults
```typescript
// In your component (copied to your project via shadcn CLI)
import { AUTH_BUTTON_DEFAULTS, AUTH_MESSAGES } from "@/lib/sensible-defaults"
import { useBitcoinAuth } from "@/hooks/use-bitcoin-auth"

export function AuthButton(props: AuthButtonProps) {
  // Merge defaults with props
  const config = { ...AUTH_BUTTON_DEFAULTS, ...props }
  const { user, signIn, signOut } = useBitcoinAuth()
  
  const handleAuth = async () => {
    if (user) {
      await signOut()
    } else {
      await signIn()
    }
  }
  
  return (
    <Button
      variant={config.variant}
      size={config.size}
      onClick={handleAuth}
    >
      {user ? AUTH_MESSAGES.signOut : AUTH_MESSAGES.signIn}
    </Button>
  )
}
```

### Provider Setup
```typescript
// In your app layout
import { 
  AUTH_PROVIDER_DEFAULTS,
  WALLET_PROVIDER_DEFAULTS,
  getEnvironmentDefaults 
} from "@/lib/sensible-defaults"

const envDefaults = getEnvironmentDefaults()

export default function RootLayout({ children }) {
  return (
    <BitcoinAuthProvider
      {...AUTH_PROVIDER_DEFAULTS}
      storageNamespace={envDefaults.storage.namespace}
    >
      <WalletProvider {...WALLET_PROVIDER_DEFAULTS}>
        {children}
      </WalletProvider>
    </BitcoinAuthProvider>
  )
}
```

## Best Practices

1. **Always use defaults** - Don't hardcode values
2. **Override sparingly** - Defaults should work for 90% of cases
3. **Document overrides** - Explain why you're changing a default
4. **Test with defaults** - Ensure components work without props
5. **Environment aware** - Use appropriate defaults per environment

## Updating Defaults

When updating defaults:
1. Consider backward compatibility
2. Test in multiple environments
3. Update documentation
4. Communicate changes to team
5. Provide migration guide if needed

Remember: Good defaults make the difference between a library that's pleasant to use and one that's frustrating. These defaults are based on real-world usage and should cover most use cases out of the box.