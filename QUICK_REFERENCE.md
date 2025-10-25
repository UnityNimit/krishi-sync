# Component Library - Quick Reference

## Import Cheatsheet

```tsx
// Layout Components
import { DashboardLayout, Topbar, Sidebar } from './components/layout'

// UI Components
import { MetricCard, StatusBadge, Table, TabPanel, ChartWrapper, Card } from './components/ui'

// Navigation Configs
import { 
  defaultNavigation, 
  farmerNavigation, 
  buyerNavigation,
  policymakerNavigation,
  logisticsNavigation,
  getNavigationForStakeholder 
} from './config/navigation'

// Types
import type { 
  DashboardLayoutConfig, 
  NavigationItem, 
  RouteMetadata 
} from './types/navigation'
```

## Common Patterns

### Create a Dashboard

```tsx
<DashboardLayout config={{
  appName: 'MyApp',
  navigation: defaultNavigation,
  showTopbar: true,
  showSidebar: false
}}>
  <YourContent />
</DashboardLayout>
```

### Display a Metric

```tsx
<MetricCard
  title="Sales"
  value="₹1,00,000"
  icon={TrendingUp}
  variant="success"
  trend={{ direction: 'up', value: '+10%' }}
/>
```

### Show Status

```tsx
<StatusBadge variant="success">Active</StatusBadge>
<StatusBadge variant="warning">Pending</StatusBadge>
<StatusBadge variant="danger">Failed</StatusBadge>
```

### Create a Table

```tsx
<Table
  data={items}
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row) => <StatusBadge variant="success">{row.status}</StatusBadge>
    }
  ]}
  keyExtractor={(row) => row.id}
  striped
/>
```

### Add Tabs

```tsx
<TabPanel
  tabs={[
    { id: 'tab1', label: 'Overview', content: <Content1 /> },
    { id: 'tab2', label: 'Details', content: <Content2 /> }
  ]}
  variant="line"
/>
```

### Wrap a Chart

```tsx
<ChartWrapper title="Sales Trend" icon={BarChart3}>
  <YourChart />
</ChartWrapper>
```

## Color Variants

All color-variant components support:
- `default` - Gray
- `primary` - Green (brand)
- `success` - Green
- `warning` - Amber
- `danger` - Red
- `info` - Blue

## Dark Mode

```tsx
// Enable
document.documentElement.classList.add('dark')

// Disable
document.documentElement.classList.remove('dark')

// Check current
const isDark = document.documentElement.classList.contains('dark')
```

## Navigation Structure

```tsx
const nav: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: Home,
    badge: '5', // optional
    disabled: false, // optional
    children: [ // optional nested items
      { id: 'sub1', label: 'Sub Item', path: '/sub' }
    ]
  }
]
```

## Utility Functions

```tsx
import { 
  formatCurrency,
  formatNumber,
  formatPercentage,
  getVariantForValue,
  getTrendDirection,
  calculatePercentageChange
} from './utils/dashboardHelpers'

formatCurrency(50000) // "₹50,000"
formatPercentage(45.2) // "45.2%"
getTrendDirection(100, 90) // "up"
calculatePercentageChange(100, 90) // "+11.1%"
```

## Layout Configurations

### Topbar Only

```tsx
config={{
  navigation: items,
  showTopbar: true,
  showSidebar: false
}}
```

### Sidebar Only

```tsx
config={{
  navigation: items,
  showTopbar: false,
  showSidebar: true
}}
```

### Both

```tsx
config={{
  navigation: items,
  showTopbar: true,
  showSidebar: true,
  sidebarCollapsible: true
}}
```

## Full Documentation

- Quick Start: `DASHBOARD_LAYOUT_GUIDE.md`
- Full Docs: `COMPONENT_LIBRARY.md`
- Feature Summary: `FEATURE_SUMMARY.md`
- Developer Guide: `src/components/README.md`
