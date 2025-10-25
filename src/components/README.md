# Component Library

This directory contains the reusable dashboard shell and UI component library for the AgriAdvisory platform.

## Directory Structure

```
components/
├── layout/
│   ├── DashboardLayout.tsx  - Main layout wrapper with sidebar/topbar
│   ├── Topbar.tsx          - Horizontal navigation bar
│   ├── Sidebar.tsx         - Vertical navigation sidebar
│   └── index.ts            - Layout exports
├── ui/
│   ├── MetricCard.tsx      - Display metrics with trends
│   ├── StatusBadge.tsx     - Status indicators
│   ├── Table.tsx           - Data table with custom rendering
│   ├── TabPanel.tsx        - Tabbed interface
│   ├── ChartWrapper.tsx    - Chart container with loading/error states
│   ├── Card.tsx            - Basic card container
│   └── index.ts            - UI component exports
└── [feature-specific components]
```

## Quick Import Guide

### Layout Components

```tsx
import { DashboardLayout, Topbar, Sidebar } from '@/components/layout'
```

### UI Components

```tsx
import {
  MetricCard,
  StatusBadge,
  Table,
  TabPanel,
  ChartWrapper,
  Card
} from '@/components/ui'
```

## Usage Patterns

### Creating a New Dashboard Page

```tsx
// pages/MyDashboard.tsx
import { MetricCard, TabPanel, ChartWrapper } from '@/components/ui'
import { TrendingUp } from 'lucide-react'

export function MyDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        My Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Sales"
          value="₹1,00,000"
          icon={TrendingUp}
          variant="success"
          trend={{ direction: 'up', value: '+10%' }}
        />
      </div>
    </div>
  )
}
```

### Wrapping with Layout

```tsx
// App.tsx
import { DashboardLayout } from '@/components/layout'
import { defaultNavigation } from '@/config/navigation'

<DashboardLayout
  config={{
    appName: 'AgriAdvisory',
    navigation: defaultNavigation,
    showTopbar: true
  }}
>
  <MyDashboard />
</DashboardLayout>
```

## Component Variants

### MetricCard Variants
- `default` - Gray
- `primary` - Green (brand color)
- `success` - Green (success state)
- `warning` - Amber
- `danger` - Red
- `info` - Blue

### StatusBadge Variants
- `default` - Gray
- `primary` - Primary brand color
- `success` - Green
- `warning` - Amber
- `danger` - Red
- `info` - Blue
- `neutral` - Neutral gray

### StatusBadge Sizes
- `sm` - Small (12px text)
- `md` - Medium (14px text) - default
- `lg` - Large (16px text)

### TabPanel Variants
- `line` - Underline style (default)
- `pills` - Pill/button style

### Card Variants
- `default` - Standard shadow
- `elevated` - Higher shadow
- `bordered` - Border emphasis
- `flat` - Minimal shadow

## Dark Mode

All components automatically support dark mode. The theme is toggled via the `dark` class on the root HTML element.

```tsx
// Enable dark mode
document.documentElement.classList.add('dark')

// Disable dark mode
document.documentElement.classList.remove('dark')
```

The `DashboardLayout` component includes a built-in dark mode toggle in the topbar.

## TypeScript Support

All components are fully typed. Import types alongside components:

```tsx
import { MetricCard } from '@/components/ui'
import type { MetricCardProps } from '@/components/ui'

const config: MetricCardProps = {
  title: 'Sales',
  value: '1000',
  variant: 'success'
}
```

## Best Practices

1. **Use MetricCard for KPIs**: Display important metrics with trends
2. **Use StatusBadge for states**: Show status like active/inactive, success/failure
3. **Use Table for data lists**: Display structured data with custom rendering
4. **Use TabPanel for grouped content**: Organize related content in tabs
5. **Use ChartWrapper for visualizations**: Consistent chart styling with loading states
6. **Use Card for general containers**: Basic content containers with variants

## Examples

See the `/src/examples` directory for comprehensive usage examples:

- `ComponentShowcase.tsx` - All UI components in action
- `FarmerDashboardExample.tsx` - Complete dashboard example
- `LayoutVariantsExample.tsx` - Different layout configurations

## Documentation

For full documentation including all props, options, and advanced usage:

- **Quick Start**: `/DASHBOARD_LAYOUT_GUIDE.md`
- **Full Documentation**: `/COMPONENT_LIBRARY.md`

## Adding New Components

When creating new reusable components:

1. Place in appropriate directory (`ui/` or `layout/`)
2. Create TypeScript interface for props
3. Add dark mode support with `dark:` classes
4. Export from `index.ts`
5. Document in component file with JSDoc comments
6. Add usage example
7. Test in both light and dark modes

## Contributing

Follow these conventions when contributing:

- Use functional components with hooks
- TypeScript for all new components
- Tailwind classes only (avoid custom CSS)
- Always include dark mode variants
- Export component and types from index.ts
- Add comprehensive prop documentation
- Include usage examples
