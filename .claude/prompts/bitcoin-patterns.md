# Bitcoin-Specific Patterns for BigBlocks

## Bitcoin Backup Support

All authentication components should understand:
- **Backup Types**: BapMasterBackup, BapMemberBackup, OneSatBackup, WifBackup
- **Storage Rules**: Encrypted in localStorage, decrypted in sessionStorage
- **Default Config**: Excludes BapMasterBackup for security
- **Namespace Support**: Different prefixes for dev/prod/test environments

### Storage Patterns
```typescript
// Session storage (temporary data)
- Decrypted backup objects
- Payment keys
- Ordinal keys  
- OAuth state
- **Cleared on signout**

// Local storage (persistent data)
- Encrypted backup strings (Base64)
- BAP rotation history (encrypted)
- **Never store decrypted data here**
- **Preserved on signout**
```

### Default Backup Configuration
```typescript
const DEFAULT_ALLOWED_BACKUP_TYPES: BackupTypeName[] = [
  "BapMemberBackup",  // Recommended for standard auth
  "OneSatBackup",     // Full wallet features
  "WifBackup"         // Simple authentication
]
// BapMasterBackup excluded by default for security
```

## Authentication Patterns

### Default API Configuration
```typescript
// Works with auth.sigmaidentity.com out of the box!
apiUrl: "https://auth.sigmaidentity.com"
headerName: "X-Auth-Token"  // Bitcoin signature, not Bearer token
timePadMs: 300000           // 5-minute time window
```

### Bitcoin Signature Authentication
- Use `bitcoin-auth` library for signature generation/verification
- Include request path, body, and timestamp in signature
- No OAuth PKCE flows - use Bitcoin signatures

### Real Function Implementations

```typescript
// Generate new BAP backup
import { HD, Mnemonic } from "@bsv/sdk"
import { BAP } from "bsv-bap"

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

## Wallet Defaults

### Transaction Limits
```typescript
minAmount: 1                    // 1 satoshi minimum
maxAmount: 2100000000000000     // 21M BSV in satoshis (no underscores)
defaultFee: 50                  // 50 satoshis
feePerByte: 0.5                // 0.5 sat/byte
dustLimit: 546                 // Standard dust limit
```

### Using satoshi-token Library
Always use `satoshi-token` for BSV amount conversions:
```typescript
import { satoshiToBsv, bsvToSatoshi } from "satoshi-token"
```

## Social Features

### BMAP API Integration
```typescript
apiUrl: "https://bmap-api-production.up.railway.app"
```

Key endpoints:
- `/social/post/search` - Search posts (no author info)
- `/social/post/address/{address}` - User posts (includes signers)
- `/social/post/{txid}` - Single post
- `/social/channels` - Available channels

## Component Patterns

### Authentication Components
- Check for existing backup on mount
- Support both local auth and server API calls
- Handle imported vs generated backups differently
- Auto-detect auth server context

### Wallet Components  
- Always check wallet capabilities before showing
- Use `WalletUserExtension` type for extended wallet features
- Handle both payment and ordinal addresses

### Social Components
- Use real BMAP API data, not mock data
- Handle different response formats (search vs user)
- Implement proper pagination
- Support real-time updates via EventSource

## Error Handling

### Centralized Messages
```typescript
export const AUTH_MESSAGES = {
  loading: "Loading...",
  error: "An error occurred",
  signIn: "Sign In with Bitcoin",
  signUp: "Create Bitcoin Account",
  // ... comprehensive list of all UI text
}
```

### Error Types
```typescript
type AuthErrorCode = 
  | "INVALID_PASSWORD"
  | "BACKUP_NOT_FOUND"
  | "NETWORK_ERROR"
  | "UNSUPPORTED_BACKUP"
  // ... etc
```

## Installation Pattern

Components are installed via shadcn CLI (copy-to-project pattern):
```bash
bunx shadcn@latest add [registry-url]/r/component-name.json
```

**NOT** via npm package imports:
```typescript
// ❌ WRONG
import { AuthButton } from 'bigblocks'

// ✅ CORRECT  
import { AuthButton } from '@/components/ui/auth-button'
```