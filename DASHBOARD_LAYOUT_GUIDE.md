# Dashboard Layout & Component Library - Quick Start Guide

This guide provides a quick overview of the new reusable dashboard shell and UI component library.

## What's New

We've created a comprehensive component library that includes:

1. **Layout Components** - DashboardLayout, Topbar, Sidebar
2. **UI Components** - MetricCard, StatusBadge, Table, TabPanel, ChartWrapper, Card
3. **Navigation System** - Route-based navigation with stakeholder-specific configurations
4. **Dark Mode Support** - All components support light and dark themes
5. **TypeScript Types** - Full type safety with TypeScript interfaces

## Quick Start

### Using the DashboardLayout

The `DashboardLayout` component provides a consistent shell for all dashboard pages:

```tsx
import { DashboardLayout } from './components/layout'
import { Sprout } from 'lucide-react'

const config = {
  appName: 'AgriAdvisory',
  logo: <Sprout className="h-8 w-8 text-primary-600" />,
  navigation: [
    { id: 'home', label: 'Dashboard', path: '/', icon: Home },
    { id: 'users', label: 'Users', path: '/users', icon: Users }
  ],
  showTopbar: true,
  showSidebar: false
}

function App() {
  return (
    <DashboardLayout config={config}>
      <YourPageContent />
    </DashboardLayout>
  )
}
```

### Using UI Components

#### MetricCard

Display key metrics with optional trends:

```tsx
import { MetricCard } from './components/ui'
import { TrendingUp } from 'lucide-react'

<MetricCard
  title="Total Revenue"
  value="₹5,00,000"
  subtitle="Last 30 days"
  icon={TrendingUp}
  variant="success"
  trend={{ direction: 'up', value: '+12.5%' }}
/>
```

#### Table

Create data tables with custom rendering:

```tsx
import { Table, StatusBadge } from './components/ui'

<Table
  data={users}
  columns={[
    { key: 'name', header: 'Name' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row) => (
        <StatusBadge variant={row.status === 'active' ? 'success' : 'neutral'}>
          {row.status}
        </StatusBadge>
      )
    }
  ]}
  keyExtractor={(row) => row.id}
  striped
  hoverable
/>
```

#### TabPanel

Create tabbed interfaces:

```tsx
import { TabPanel } from './components/ui'

<TabPanel
  tabs={[
    { id: 'overview', label: 'Overview', content: <OverviewTab /> },
    { id: 'details', label: 'Details', content: <DetailsTab /> }
  ]}
  variant="line"
/>
```

## Stakeholder-Specific Navigation

Pre-configured navigation for different user types:

```tsx
import { getNavigationForStakeholder } from './config/navigation'

// Get navigation for farmers
const farmerNav = getNavigationForStakeholder('farmer')

// Get navigation for buyers
const buyerNav = getNavigationForStakeholder('buyer')

// Get navigation for policymakers
const policymakerNav = getNavigationForStakeholder('policymaker')
```

Available stakeholder types:
- `'farmer'` - Crop advisory, marketplace, credit & insurance
- `'buyer'` - Marketplace, suppliers, product tracing
- `'policymaker'` - Intelligence dashboard, analytics, reports
- `'logistics'` - Routes, shipments, analytics
- Default - All features

## Dark Mode

Toggle dark mode programmatically:

```tsx
// Enable dark mode
document.documentElement.classList.add('dark')
localStorage.setItem('theme', 'dark')

// Disable dark mode
document.documentElement.classList.remove('dark')
localStorage.setItem('theme', 'light')
```

The `DashboardLayout` component includes a built-in dark mode toggle button in the topbar.

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx
│   │   ├── Topbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── index.ts
│   └── ui/
│       ├── MetricCard.tsx
│       ├── StatusBadge.tsx
│       ├── Table.tsx
│       ├── TabPanel.tsx
│       ├── ChartWrapper.tsx
│       ├── Card.tsx
│       └── index.ts
├── config/
│   └── navigation.ts
├── types/
│   └── navigation.ts
├── examples/
│   └── ComponentShowcase.tsx
└── ...
```

## Example Component

See `src/examples/ComponentShowcase.tsx` for a complete demonstration of all components.

## Full Documentation

For detailed documentation including:
- All component props and options
- Advanced usage examples
- Styling guidelines
- Best practices

See `COMPONENT_LIBRARY.md` in the project root.

## Migration Guide

To migrate existing pages to use the new layout:

1. Wrap your app with `DashboardLayout`:

```tsx
// Before
function App() {
  return (
    <div>
      <Navigation />
      <YourPage />
    </div>
  )
}

// After
function App() {
  return (
    <DashboardLayout config={dashboardConfig}>
      <YourPage />
    </DashboardLayout>
  )
}
```

2. Replace custom cards with `MetricCard`:

```tsx
// Before
<div className="card">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm">Total Users</p>
      <p className="text-3xl font-bold">1,234</p>
    </div>
    <Users className="h-12 w-12" />
  </div>
</div>

// After
<MetricCard
  title="Total Users"
  value="1,234"
  icon={Users}
  variant="primary"
/>
```

3. Use `StatusBadge` for status indicators:

```tsx
// Before
<span className="badge bg-green-100 text-green-800">
  Active
</span>

// After
<StatusBadge variant="success">Active</StatusBadge>
```

## Benefits

✅ **Consistency** - Uniform look and feel across all dashboards
✅ **Dark Mode** - Built-in theme switching
✅ **Responsive** - Mobile-friendly by default
✅ **Type Safe** - Full TypeScript support
✅ **Customizable** - Variants and props for different use cases
✅ **Reusable** - DRY principle with shared components
✅ **Documented** - Comprehensive documentation and examples
