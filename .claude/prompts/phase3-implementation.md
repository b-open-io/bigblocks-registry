# Phase 3: Initial Implementation

Generate a fully-featured, production-ready component that goes beyond the basics. Don't hold back - give it your all to create an impressive implementation that showcases the best of web development.

**Quality Standards:**
- Include thoughtful details like hover states, transitions, and micro-interactions
- Create comprehensive error handling and loading states
- Add animations where they enhance user experience
- Build with accessibility and performance in mind
- NEVER use `any` type - ensure all types are explicitly defined for type safety

## Implementation Checklist

### 1. File Setup

```typescript
// Determine "use client" need
- Uses hooks? → "use client"
- Has event handlers? → "use client"  
- Uses browser APIs? → "use client"
- Pure presentational? → No directive

// Import order
1. "use client" (if needed)
2. React and type imports
3. UI component imports (@/components/ui/*)
4. Library imports (npm packages)
5. Type definitions
6. Constants and utilities
```

### 2. Type Definitions

```typescript
// Props interface with JSDoc
export interface ComponentProps {
  /** Optional CSS class name */
  className?: string
  
  /** Size variant */
  size?: "sm" | "md" | "lg"
  
  /** Visual style variant */
  variant?: "default" | "outline" | "ghost"
  
  /** Callback fired on success */
  onSuccess?: (data: ResultType) => void
  
  /** Callback fired on error */
  onError?: (error: Error) => void
}

// Never use any or unknown
type ResultType = {
  txid: string
  address: string
  amount: number // in satoshis
}
```

### 3. Component Structure

```typescript
export function ComponentName({
  className,
  size = "md",
  variant = "default",
  onSuccess,
  onError,
  ...props
}: ComponentProps) {
  // State management
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  // Provider access
  const { user } = useBitcoinAuth()
  const { balance } = useWallet()
  
  // Event handlers
  const handleAction = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Implementation
      const result = await performAction()
      onSuccess?.(result)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }, [onSuccess, onError])
  
  // Render
  return (
    <div className={cn("bigblocks-component", className)} {...props}>
      {/* Component UI */}
    </div>
  )
}
```

### 4. Bitcoin-Specific Patterns

#### Authentication Integration
```typescript
// Check auth state
const { user, isAuthenticated } = useBitcoinAuth()

if (!isAuthenticated) {
  return (
    <Alert>
      <AlertDescription>
        Please sign in to use this feature
      </AlertDescription>
    </Alert>
  )
}

// Use auth token for API calls
const authToken = await createAuthToken({
  privateKey: user.privateKey,
  requestPath: '/api/endpoint',
  body: JSON.stringify(data)
})
```

#### Wallet Operations
```typescript
// Check wallet capabilities
const wallet = await getWalletExtension()
if (!wallet?.canSendBSV) {
  return <Alert>Wallet features not available</Alert>
}

// Build transaction
const tx = new Transaction()
  .from(utxos)
  .to(address, amount)
  .change(changeAddress)
  .sign(privateKey)

// Broadcast
const txid = await broadcastTransaction(tx)
```

#### Social Features
```typescript
// Post to blockchain via BMAP
const post = {
  app: 'bigblocks',
  type: 'post',
  content: message,
  timestamp: Date.now()
}

// Like a post
const like = {
  app: 'bigblocks',
  type: 'like',
  tx: postTxid
}
```

### 5. Storage Patterns

```typescript
// Session storage (temporary)
const storeTemporary = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(`bigblocks:${key}`, JSON.stringify(value))
  }
}

// Local storage (persistent, encrypted only)
const storePersistent = async (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    // Only store encrypted data
    const encrypted = await encryptData(value)
    localStorage.setItem(`bigblocks:${key}`, encrypted)
  }
}
```

### 6. Error Handling

```typescript
// Use centralized messages
import { AUTH_MESSAGES, WALLET_MESSAGES } from '@/lib/sensible-defaults'

// Structured error handling
try {
  await riskyOperation()
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    toast({
      title: WALLET_MESSAGES.insufficientFunds,
      variant: 'destructive'
    })
  } else {
    toast({
      title: 'Error',
      description: error.message || 'An unexpected error occurred',
      variant: 'destructive'
    })
  }
}
```

### 7. Theme Compatibility

Theme compatibility is crucial for BigBlocks components because users expect them to work seamlessly with any shadcn theme they choose. Using semantic colors ensures the component adapts automatically to different color schemes.

```typescript
// Always use semantic colors for automatic theme adaptation
<Button
  variant={variant}
  size={size}
  className={cn(
    // Semantic classes that adapt to any theme
    "bg-primary text-primary-foreground",
    "hover:bg-primary/90",
    "focus:ring-ring",
    // Add smooth transitions for professional feel
    "transition-colors duration-200",
    className
  )}
>
  
// NEVER use direct colors - they break theme compatibility
// ❌ WRONG: "bg-blue-500 text-white" - This will always be blue regardless of theme
// ✅ RIGHT: "bg-primary text-primary-foreground" - This adapts to the user's chosen theme
```

### 8. Accessibility

```typescript
// ARIA labels
<Button
  aria-label="Send Bitcoin SV"
  aria-busy={isLoading}
  aria-disabled={isDisabled}
>

// Keyboard navigation
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleAction()
  }
}}

// Focus management
const buttonRef = useRef<HTMLButtonElement>(null)
useEffect(() => {
  if (shouldFocus) {
    buttonRef.current?.focus()
  }
}, [shouldFocus])
```

### 9. Performance Optimization

```typescript
// Memoize expensive computations
const formattedAmount = useMemo(() => {
  return formatBSV(amount)
}, [amount])

// Debounce user input
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  [handleSearch]
)

// Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

### 10. Testing Considerations

```typescript
// Export for testing
export const ComponentNameTestIds = {
  root: 'component-name',
  button: 'component-name-button',
  input: 'component-name-input'
} as const

// Use test IDs
<div data-testid={ComponentNameTestIds.root}>
  <Button data-testid={ComponentNameTestIds.button}>
    Click me
  </Button>
</div>
```

## Common Patterns Reference

Implement these patterns with attention to detail and user experience:

### Loading States
```typescript
// Create smooth, informative loading states
if (isLoading) {
  return (
    <div className="space-y-2">
      <Skeleton className="w-full h-10 animate-pulse" />
      <p className="text-sm text-muted-foreground text-center">
        Loading your Bitcoin wallet...
      </p>
    </div>
  )
}
```

### Empty States
```typescript
// Design engaging empty states that guide users
if (!data?.length) {
  return (
    <Card className="border-dashed">
      <CardContent className="text-center py-10 space-y-3">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <IconPlaceholder className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">No items found</p>
          <p className="text-sm text-muted-foreground">
            Get started by creating your first item
          </p>
        </div>
        <Button variant="outline" size="sm">
          Create Item
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Error States
```typescript
// Provide helpful error states with recovery options
if (error) {
  return (
    <Alert variant="destructive" className="animate-in fade-in-50">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>{error.message}</p>
        <Button variant="outline" size="sm" onClick={retry}>
          Try again
        </Button>
      </AlertDescription>
    </Alert>
  )
}
```

Remember: Every state should be polished and thoughtful. These details make the difference between good and exceptional components.