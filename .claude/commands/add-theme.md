Add a new theme "$ARGUMENTS" to the BigBlocks registry.

## What is a Theme?
A theme is a color scheme configuration that defines CSS variables for both light and dark modes. Themes use the HSL color format and follow shadcn-ui's theming system.

## CRITICAL RULES
1. **Use HSL format** - All colors must be in HSL format without the hsl() wrapper
2. **Define both light and dark** - Every theme needs both mode definitions
3. **Follow naming conventions** - Use exact CSS variable names from shadcn
4. **Test with components** - Ensure all UI elements look good with your theme
5. **Reference shadcn themes**: Check `/Users/satchmo/code/shadcn-ui/apps/www/registry/registry-themes.ts`

## Step 1: Understanding the Color System

### Required CSS Variables:
```
background - Page background
foreground - Default text color
card - Card backgrounds
card-foreground - Card text color
popover - Popover backgrounds
popover-foreground - Popover text
primary - Primary brand color
primary-foreground - Text on primary backgrounds
secondary - Secondary brand color
secondary-foreground - Text on secondary backgrounds
muted - Muted backgrounds
muted-foreground - Muted text
accent - Accent color for highlights
accent-foreground - Text on accent backgrounds
destructive - Error/danger color
destructive-foreground - Text on destructive backgrounds
border - Default borders
input - Input borders
ring - Focus ring color
```

### Chart Colors (optional):
```
chart-1 through chart-5 - Colors for data visualization
```

### Color Format:
- Format: "H S% L%" (e.g., "222.2 84% 4.9%")
- H: Hue (0-360)
- S: Saturation (0-100%)
- L: Lightness (0-100%)

## Step 2: Design Your Theme

### Use a Color Tool:
1. Visit https://ui.shadcn.com/themes
2. Use the theme customizer to design your colors
3. Or use https://uicolors.app/create to generate a palette

### Color Guidelines:
- **Contrast**: Ensure foreground/background pairs meet WCAG standards
- **Consistency**: Related colors should have similar saturation
- **Hierarchy**: Primary should stand out, muted should recede
- **Dark mode**: Often needs adjusted lightness values

## Step 3: Create Theme Configuration

Edit `apps/registry/registry.json`:

```json
{
  "name": "theme-[name]",
  "type": "registry:theme",
  "author": "Satchmo",
  "cssVars": {
    "light": {
      "background": "0 0% 100%",
      "foreground": "222.2 84% 4.9%",
      "card": "0 0% 100%",
      "card-foreground": "222.2 84% 4.9%",
      "popover": "0 0% 100%",
      "popover-foreground": "222.2 84% 4.9%",
      "primary": "222.2 47.4% 11.2%",
      "primary-foreground": "210 40% 98%",
      "secondary": "210 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
      "muted": "210 40% 96.1%",
      "muted-foreground": "215.4 16.3% 46.9%",
      "accent": "210 40% 96.1%",
      "accent-foreground": "222.2 47.4% 11.2%",
      "destructive": "0 84.2% 60.2%",
      "destructive-foreground": "210 40% 98%",
      "border": "214.3 31.8% 91.4%",
      "input": "214.3 31.8% 91.4%",
      "ring": "222.2 84% 4.9%",
      "chart-1": "12 76% 61%",
      "chart-2": "173 58% 39%",
      "chart-3": "197 37% 24%",
      "chart-4": "43 74% 66%",
      "chart-5": "27 87% 67%"
    },
    "dark": {
      "background": "222.2 84% 4.9%",
      "foreground": "210 40% 98%",
      "card": "222.2 84% 4.9%",
      "card-foreground": "210 40% 98%",
      "popover": "222.2 84% 4.9%",
      "popover-foreground": "210 40% 98%",
      "primary": "210 40% 98%",
      "primary-foreground": "222.2 47.4% 11.2%",
      "secondary": "217.2 32.6% 17.5%",
      "secondary-foreground": "210 40% 98%",
      "muted": "217.2 32.6% 17.5%",
      "muted-foreground": "215 20.2% 65.1%",
      "accent": "217.2 32.6% 17.5%",
      "accent-foreground": "210 40% 98%",
      "destructive": "0 62.8% 30.6%",
      "destructive-foreground": "210 40% 98%",
      "border": "217.2 32.6% 17.5%",
      "input": "217.2 32.6% 17.5%",
      "ring": "212.7 26.8% 83.9%",
      "chart-1": "220 70% 50%",
      "chart-2": "160 60% 45%",
      "chart-3": "30 80% 55%",
      "chart-4": "280 65% 60%",
      "chart-5": "340 75% 55%"
    }
  }
}
```

## Step 4: Build Registry
```bash
cd apps/registry && bun registry:build
```

## Step 5: Create Theme Documentation

Location: `apps/showcase/content/docs/themes/[theme-name].mdx`

```mdx
---
title: [Theme Name]
description: [Description of the theme's aesthetic and use cases]
---

<ThemePreview name="theme-[name]" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">

```bash
npx shadcn@latest add {{REGISTRY_URL}}/r/theme-[name].json
```

  </TabsContent>
  <TabsContent value="manual">

<Steps>

<Step>Copy the theme CSS variables to your globals.css:</Step>

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... copy all light mode variables ... */
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... copy all dark mode variables ... */
  }
}
```

</Steps>

  </TabsContent>
</CodeTabs>

## Color Palette

### Primary Colors
- **Primary**: Used for main actions and brand elements
- **Secondary**: Supporting UI elements and secondary actions

### Neutral Colors
- **Background**: Main page background
- **Foreground**: Default text color
- **Muted**: Subdued backgrounds and disabled states

### Semantic Colors
- **Destructive**: Errors, warnings, and dangerous actions
- **Accent**: Highlights and points of emphasis

## Usage with Components

This theme works with all shadcn-ui and BigBlocks components:

```tsx
<Button>Default uses primary color</Button>
<Button variant="secondary">Uses secondary color</Button>
<Button variant="destructive">Uses destructive color</Button>
<Card>Uses card background and foreground</Card>
```

## Customization

You can override specific colors while keeping the theme:

```css
:root {
  /* Override just the primary color */
  --primary: 262.1 83.3% 57.8%;
}
```

## Accessibility

This theme has been tested for WCAG color contrast compliance:
- Normal text: AA compliant
- Large text: AAA compliant
- Interactive elements: AA compliant
```

## Step 6: Create Visual Preview

Create a theme preview component if needed:
`apps/showcase/components/theme-preview.tsx`

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ThemePreview() {
  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Theme Preview</h3>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="input">Input Label</Label>
            <Input id="input" placeholder="Type something..." />
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            <div className="h-10 bg-primary rounded" />
            <div className="h-10 bg-secondary rounded" />
            <div className="h-10 bg-accent rounded" />
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-destructive rounded" />
          </div>
        </div>
      </Card>
    </div>
  )
}
```

## Common Theme Patterns

### Monochromatic Theme
Uses variations of a single hue:
```json
"primary": "220 70% 50%",
"secondary": "220 30% 70%",
"accent": "220 60% 60%"
```

### Complementary Theme
Uses opposite colors on the color wheel:
```json
"primary": "220 70% 50%",    // Blue
"accent": "40 70% 50%"       // Orange
```

### Analogous Theme
Uses adjacent colors:
```json
"primary": "220 70% 50%",    // Blue
"secondary": "260 70% 50%",  // Purple
"accent": "180 70% 50%"      // Cyan
```

### Brand Theme
Based on company colors:
```json
"primary": "15 90% 50%",     // Brand orange
"secondary": "0 0% 20%",     // Brand black
"accent": "15 70% 60%"       // Light orange
```

## Testing Your Theme

1. **Component Testing**: Test with all component variants
2. **Color Contrast**: Use tools like WebAIM contrast checker
3. **Dark Mode**: Ensure both modes look good
4. **Real Content**: Test with actual app content
5. **Accessibility**: Run accessibility audits

## Common Mistakes to Avoid
- Using RGB or HEX values instead of HSL
- Forgetting dark mode definitions
- Poor contrast ratios
- Inconsistent saturation levels
- Not testing with real components
- Missing required variables
- Using hsl() wrapper in values
- Not following the exact variable names

## Reference Themes
Check shadcn-ui themes for inspiration:
```bash
cat /Users/satchmo/code/shadcn-ui/apps/www/registry/registry-themes.ts
```

Popular theme patterns:
- Default (neutral grays)
- Zinc (cool grays)
- Slate (blue-grays)
- Rose (pink accents)
- Orange (warm theme)
- Green (nature theme)
- Blue (corporate theme)
- Violet (creative theme)