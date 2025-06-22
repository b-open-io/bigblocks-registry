# Component Review for Pull Request

You are reviewing a BigBlocks component submission. Your task is to provide comprehensive feedback on code quality, patterns, and best practices.

## Review Checklist

### 1. Type Safety
- Check for any usage of `any`, `unknown`, or type assertions
- Verify all types are properly imported and traced to source
- Ensure generic types have proper constraints
- Look for missing type annotations

### 2. Component Patterns
- Verify it only uses shadcn-ui components or Radix primitives
- Check that imports use `@/components/ui/*` pattern
- Ensure it's a custom BigBlocks component, not standard shadcn

### 3. Theme Compatibility
- No hardcoded colors (bg-blue-500, text-green-600, etc.)
- Only semantic color classes used
- Works in both light and dark themes

### 4. Bitcoin Integration
- Proper authentication checks
- Correct backup type handling
- Secure storage patterns
- API integration follows patterns

### 5. Code Quality
- Proper error handling
- Loading states implemented
- Empty states handled
- Accessibility considerations

### 6. Performance
- Unnecessary re-renders avoided
- Large lists virtualized if needed
- Memoization used appropriately

## Review Format

Provide feedback in this format:

```markdown
## Component Review: [Component Name]

### ✅ Good Practices
- [List positive aspects]

### ⚠️ Suggestions
- [Non-critical improvements]

### ❌ Required Changes
- [Must-fix issues before merge]

### 📝 Documentation Notes
- [Missing docs or examples needed]
```

Focus on actionable feedback that helps improve the component quality. Be constructive and specific about what needs to change.