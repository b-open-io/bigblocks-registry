# Phase 5: Final Polish & Testing

Complete final steps to ensure the component is production-ready.

## 1. CLI Installation Test

### Generate Registry Entry
```bash
cd apps/registry
bun registry:build
```

### Test Local Installation
```bash
# In a test project
cd /tmp/test-project
bunx create-next-app@latest . --typescript --tailwind --app

# Install component locally
bunx shadcn@latest add "file:///path/to/bigblocks-registry/apps/registry/public/r/component-name.json"
```

### Verify Installation
- Component file created in correct location
- All dependencies installed
- Import paths resolve correctly
- No TypeScript errors

## 2. Documentation Finalization

### Component README
Create `apps/showcase/content/docs/components/[component-name].mdx`:

```mdx
---
title: Component Name
description: Brief description of what the component does
featured: true
component: true
---

<ComponentPreview name="component-name-demo" />

## Installation

<Tabs defaultValue="cli">
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">
    ```bash
    bunx shadcn@latest add {{REGISTRY_URL}}/r/component-name.json
    ```
  </TabsContent>
  <TabsContent value="manual">
    <Steps>
      <Step>Install dependencies</Step>
      ```bash
      bun add [required-packages]
      ```
      
      <Step>Copy the component</Step>
      <ComponentSource name="component-name" />
    </Steps>
  </TabsContent>
</Tabs>

## Usage

```tsx
import { ComponentName } from "@/components/ui/component-name"

export function Example() {
  return (
    <ComponentName
      size="md"
      onSuccess={(data) => console.log(data)}
    />
  )
}
```

## API Reference

### ComponentName

<PropsTable
  data={[
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size variant of the component"
    },
    // ... more props
  ]}
/>
```

## 3. Visual Testing

### Create Demo Variants
```typescript
// apps/registry/registry/new-york/examples/component-name-demo.tsx
export default function ComponentNameDemo() {
  return (
    <div className="flex flex-col gap-4">
      <ComponentName size="sm" />
      <ComponentName size="md" />
      <ComponentName size="lg" />
    </div>
  )
}

// Additional variants
export function ComponentNameLoading() {
  return <ComponentName isLoading />
}

export function ComponentNameError() {
  return <ComponentName error={new Error("Sample error")} />
}
```

### Theme Testing
Test in both light and dark modes:
- Visual consistency
- Proper contrast
- No broken styles
- Smooth transitions

## 4. Integration Testing

### With Authentication
```typescript
// Test authenticated state
const AuthenticatedTest = () => {
  const { user } = useBitcoinAuth()
  return user ? <ComponentName /> : <div>Not authenticated</div>
}

// Test unauthenticated state
const UnauthenticatedTest = () => {
  return (
    <BitcoinAuthProvider>
      <ComponentName />
    </BitcoinAuthProvider>
  )
}
```

### With Wallet
```typescript
// Test with wallet capabilities
const WalletTest = () => {
  return (
    <WalletProvider>
      <ComponentName />
    </WalletProvider>
  )
}
```

## 5. Performance Testing

### Bundle Size Check
```bash
# Check component size
du -sh apps/registry/registry/new-york/ui/component-name.tsx

# Check full bundle impact
cd apps/showcase
bun run build
# Note bundle size before/after
```

### Runtime Performance
- Test with React DevTools Profiler
- Check for unnecessary re-renders
- Verify memo usage is effective
- Monitor memory usage

## 6. Accessibility Testing

### Keyboard Testing
- Tab through all interactive elements
- Test Enter/Space key activation
- Verify Escape key handling
- Check focus trap if modal

### Screen Reader Testing
- Test with NVDA/JAWS (Windows) or VoiceOver (Mac)
- Verify announcements make sense
- Check live regions work
- Ensure form labels are associated

### Automated Testing
```bash
# Run axe accessibility checks
bunx playwright test a11y
```

## 7. Browser Compatibility

### Test Across Browsers
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

### Check Features
- CSS features supported
- JavaScript APIs available
- Performance acceptable
- No console errors

## 8. Security Review

### Input Validation
- XSS prevention (no dangerouslySetInnerHTML)
- SQL injection not possible
- CSRF protection considered
- Input sanitization present

### Storage Security
- No sensitive data in localStorage
- Encryption used where needed
- Secure key management
- No exposed secrets

## 9. Final Build Verification

```bash
# Type check everything
cd apps/showcase && bunx tsc --noEmit
cd apps/registry && bunx tsc --noEmit

# Lint check
cd apps/showcase && bun run lint
cd apps/registry && bun run lint

# Build showcase
cd apps/showcase && bun run build

# Build registry
cd apps/registry && bun registry:build
```

## 10. Pre-Release Checklist

### Code Quality
- [ ] No TypeScript errors
- [ ] No linting warnings
- [ ] No console.log statements
- [ ] Error boundaries in place

### Documentation
- [ ] Props documented with JSDoc
- [ ] Usage examples complete
- [ ] API reference accurate
- [ ] Migration notes if needed

### Testing
- [ ] Component renders correctly
- [ ] All props work as expected
- [ ] Error states handled
- [ ] Loading states smooth

### Performance
- [ ] Bundle size acceptable
- [ ] No memory leaks
- [ ] Renders efficiently
- [ ] Animations smooth

### Accessibility
- [ ] Keyboard navigable
- [ ] Screen reader friendly
- [ ] Color contrast passes
- [ ] Focus indicators visible

### Integration
- [ ] Works with providers
- [ ] CLI installation works
- [ ] Dependencies resolve
- [ ] No breaking changes

## Common Final Issues

1. **Forgot to export types** - Component works but types not available
2. **Missing peer dependencies** - Component fails in fresh install
3. **Relative imports** - Should use @/ aliases
4. **Console logs left in** - Remove debug statements
5. **Missing examples** - No demo for showcase
6. **Wrong registry type** - Should be registry:ui, not registry:component
7. **No error boundaries** - Errors crash entire app
8. **Missing loading states** - UI jumps when data loads
9. **Hardcoded values** - Should use props/config
10. **No keyboard support** - Not accessible

## Release Notes Template

```markdown
### New Component: ComponentName

**Category**: authentication|wallet|social|market

**Description**: Brief description of the component's purpose

**Features**:
- Feature 1
- Feature 2
- Feature 3

**Usage**:
\```tsx
import { ComponentName } from "@/components/ui/component-name"

<ComponentName size="md" onSuccess={handleSuccess} />
\```

**Dependencies**:
- shadcn components: button, card, dialog
- npm packages: @bsv/sdk, bitcoin-auth
```