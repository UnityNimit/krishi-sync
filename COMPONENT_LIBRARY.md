# Dashboard Component Library Documentation

This document provides comprehensive documentation for the reusable dashboard shell and UI component library.

## Table of Contents

1. [Layout Components](#layout-components)
   - [DashboardLayout](#dashboardlayout)
   - [Topbar](#topbar)
   - [Sidebar](#sidebar)
2. [UI Components](#ui-components)
   - [MetricCard](#metriccard)
   - [StatusBadge](#statusbadge)
   - [Table](#table)
   - [TabPanel](#tabpanel)
   - [ChartWrapper](#chartwrapper)
   - [Card](#card)
3. [Dark Mode Support](#dark-mode-support)
4. [Usage Examples](#usage-examples)

---

## Layout Components

### DashboardLayout

A flexible dashboard layout component that provides a consistent shell for all dashboard pages with optional sidebar and topbar navigation.

**Props:**

```typescript
interface DashboardLayoutProps {
  children: ReactNode
  config: DashboardLayoutConfig
  className?: string
}

interface DashboardLayoutConfig {
  appName: string
  logo?: ReactNode
  navigation: NavigationItem[]
  showSidebar?: boolean
  showTopbar?: boolean
  sidebarCollapsible?: boolean
  userMenu?: ReactNode
  footer?: ReactNode
}
```

**Features:**
- Responsive design with mobile sidebar support
- Optional sidebar and topbar
- Collapsible sidebar on desktop
- Dark mode support
- Route-based navigation highlighting
- User menu integration

**Example:**

```tsx
import { DashboardLayout } from '@/components/layout'
import { Home, Users, Settings } from 'lucide-react'

const config = {
  appName: 'AgriAdvisory',
  logo: <Sprout className="h-8 w-8 text-primary-600" />,
  navigation: [
    { id: 'home', label: 'Home', path: '/', icon: Home },
    { id: 'users', label: 'Users', path: '/users', icon: Users },
    { id: 'settings', label: 'Settings', path: '/settings', icon: Settings }
  ],
  showSidebar: true,
  showTopbar: true,
  sidebarCollapsible: true
}

function App() {
  return (
    <DashboardLayout config={config}>
      <YourPageContent />
    </DashboardLayout>
  )
}
```

### Topbar

A horizontal navigation bar with branding, navigation links, and utility actions.

**Props:**

```typescript
interface TopbarProps {
  appName: string
  logo?: ReactNode
  navigation: NavigationItem[]
  userMenu?: ReactNode
  onMenuClick?: () => void
  className?: string
}
```

**Features:**
- Logo and app name display
- Horizontal navigation links with active state
- Dark mode toggle
- User menu slot
- Mobile menu button
- Badge support for navigation items

### Sidebar

A vertical navigation sidebar with collapsible support and nested navigation.

**Props:**

```typescript
interface SidebarProps {
  navigation: NavigationItem[]
  collapsed?: boolean
  className?: string
}
```

**Features:**
- Nested navigation support
- Active route highlighting
- Collapsible mode
- Badge support
- Disabled state handling
- Icon support

---

## UI Components

### MetricCard

Display key metrics and statistics with optional trends and icons.

**Props:**

```typescript
interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  trend?: {
    direction: 'up' | 'down' | 'neutral'
    value: string
  }
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
  children?: ReactNode
}
```

**Variants:**
- `default` - Gray gradient
- `primary` - Primary color gradient
- `success` - Green gradient
- `warning` - Amber gradient
- `danger` - Red gradient
- `info` - Blue/sky gradient

**Example:**

```tsx
import { MetricCard } from '@/components/ui'
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

### StatusBadge

Display status indicators with various colors and sizes.

**Props:**

```typescript
interface StatusBadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
```

**Example:**

```tsx
import { StatusBadge } from '@/components/ui'

<StatusBadge variant="success" size="sm">Active</StatusBadge>
<StatusBadge variant="warning">Pending</StatusBadge>
<StatusBadge variant="danger">Failed</StatusBadge>
```

### Table

A flexible table component with support for custom rendering, sorting, and styling.

**Props:**

```typescript
interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  keyExtractor: (row: T, index: number) => string | number
  className?: string
  striped?: boolean
  hoverable?: boolean
  compact?: boolean
  emptyMessage?: string
}

interface TableColumn<T> {
  key: string
  header: string
  render?: (row: T) => ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}
```

**Example:**

```tsx
import { Table } from '@/components/ui'
import { StatusBadge } from '@/components/ui'

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <StatusBadge variant={row.status === 'active' ? 'success' : 'danger'}>
        {row.status}
      </StatusBadge>
    )
  }
]

<Table
  data={users}
  columns={columns}
  keyExtractor={(row) => row.id}
  striped
  hoverable
/>
```

### TabPanel

Create tabbed interfaces with ease.

**Props:**

```typescript
interface TabPanelProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
  className?: string
  variant?: 'line' | 'pills'
}

interface Tab {
  id: string
  label: string
  icon?: ReactNode
  content: ReactNode
  disabled?: boolean
}
```

**Variants:**
- `line` - Underline style tabs
- `pills` - Pill-shaped tabs

**Example:**

```tsx
import { TabPanel } from '@/components/ui'
import { Home, Settings } from 'lucide-react'

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <Home className="h-4 w-4" />,
    content: <div>Overview content</div>
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="h-4 w-4" />,
    content: <div>Settings content</div>
  }
]

<TabPanel tabs={tabs} variant="line" />
```

### ChartWrapper

Wrap charts with consistent styling, loading states, and error handling.

**Props:**

```typescript
interface ChartWrapperProps {
  title: string
  description?: string
  icon?: LucideIcon
  children: ReactNode
  className?: string
  actions?: ReactNode
  loading?: boolean
  error?: string
}
```

**Example:**

```tsx
import { ChartWrapper } from '@/components/ui'
import { BarChart3 } from 'lucide-react'
import { LineChart, Line } from 'recharts'

<ChartWrapper
  title="Sales Trend"
  description="Monthly sales for the last 6 months"
  icon={BarChart3}
  loading={isLoading}
  error={error}
>
  <LineChart data={data}>
    <Line dataKey="sales" />
  </LineChart>
</ChartWrapper>
```

### Card

A simple card container with variants and padding options.

**Props:**

```typescript
interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'bordered' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}
```

**Example:**

```tsx
import { Card } from '@/components/ui'

<Card variant="elevated" padding="lg">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

---

## Dark Mode Support

All components support dark mode out of the box using Tailwind's dark mode classes. The theme is controlled via the `dark` class on the root HTML element.

### Manual Toggle

```typescript
// Enable dark mode
document.documentElement.classList.add('dark')
localStorage.setItem('theme', 'dark')

// Disable dark mode
document.documentElement.classList.remove('dark')
localStorage.setItem('theme', 'light')
```

### Automatic Detection

The DashboardLayout component automatically detects the user's system preference and saved theme:

```typescript
useEffect(() => {
  const theme = localStorage.getItem('theme')
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  }
}, [])
```

---

## Usage Examples

### Complete Dashboard Example

```tsx
import { DashboardLayout } from '@/components/layout'
import { MetricCard, Table, TabPanel, ChartWrapper, StatusBadge } from '@/components/ui'
import { Home, Users, TrendingUp } from 'lucide-react'

const dashboardConfig = {
  appName: 'AgriAdvisory',
  logo: <Sprout className="h-8 w-8 text-primary-600" />,
  navigation: [
    { id: 'home', label: 'Dashboard', path: '/', icon: Home },
    { id: 'users', label: 'Users', path: '/users', icon: Users }
  ],
  showTopbar: true,
  showSidebar: false
}

function Dashboard() {
  return (
    <DashboardLayout config={dashboardConfig}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Users"
            value="1,234"
            icon={Users}
            variant="primary"
            trend={{ direction: 'up', value: '+12%' }}
          />
          <MetricCard
            title="Revenue"
            value="₹5,00,000"
            icon={TrendingUp}
            variant="success"
            trend={{ direction: 'up', value: '+8.5%' }}
          />
          <MetricCard
            title="Active Projects"
            value="42"
            variant="info"
          />
        </div>

        <ChartWrapper title="Monthly Trends" description="Last 6 months">
          {/* Your chart component */}
        </ChartWrapper>

        <TabPanel
          tabs={[
            { id: 'all', label: 'All Users', content: <UserTable filter="all" /> },
            { id: 'active', label: 'Active', content: <UserTable filter="active" /> }
          ]}
          variant="line"
        />
      </div>
    </DashboardLayout>
  )
}
```

### Stakeholder-Specific Dashboard

```tsx
import { DashboardLayout } from '@/components/layout'
import { Sprout, TrendingUp, Users } from 'lucide-react'

const farmerNav = [
  { id: 'home', label: 'Dashboard', path: '/', icon: Sprout },
  { id: 'crops', label: 'My Crops', path: '/crops', icon: Sprout },
  { id: 'marketplace', label: 'Marketplace', path: '/marketplace', icon: TrendingUp }
]

const buyerNav = [
  { id: 'home', label: 'Dashboard', path: '/', icon: Home },
  { id: 'purchases', label: 'Purchases', path: '/purchases', icon: ShoppingCart },
  { id: 'suppliers', label: 'Suppliers', path: '/suppliers', icon: Users }
]

function FarmerDashboard() {
  return (
    <DashboardLayout config={{ 
      appName: 'Farmer Portal',
      navigation: farmerNav,
      showSidebar: true
    }}>
      {/* Farmer-specific content */}
    </DashboardLayout>
  )
}

function BuyerDashboard() {
  return (
    <DashboardLayout config={{ 
      appName: 'Buyer Portal',
      navigation: buyerNav,
      showSidebar: true
    }}>
      {/* Buyer-specific content */}
    </DashboardLayout>
  )
}
```

---

## Component Styling Guidelines

### Colors

The component library uses Tailwind's color system with custom primary colors:

- **Primary**: Green shades (agricultural theme)
- **Success**: Green
- **Warning**: Amber
- **Danger**: Red
- **Info**: Blue/Sky

### Spacing

- Use consistent spacing with Tailwind's spacing scale
- Default card padding: `p-6` (24px)
- Default gap between cards: `gap-6` (24px)

### Typography

- Headings: Use font-bold with appropriate text sizes
- Body: Default text-gray-900 (dark) / text-gray-100 (light)
- Subtle text: text-gray-600 (dark) / text-gray-400 (light)

### Accessibility

- All interactive components support keyboard navigation
- Color contrast meets WCAG AA standards
- Semantic HTML elements used throughout
- ARIA labels where appropriate

---

## Best Practices

1. **Consistent Layout**: Always wrap page content with `DashboardLayout` for consistent navigation and styling
2. **Component Composition**: Use smaller components to build larger features
3. **Type Safety**: Leverage TypeScript interfaces for type-safe component props
4. **Dark Mode**: Test components in both light and dark modes
5. **Responsive Design**: Use Tailwind's responsive utilities to ensure mobile compatibility
6. **Performance**: Avoid unnecessary re-renders by memoizing callbacks and values
7. **Accessibility**: Include proper ARIA labels and keyboard navigation support

---

## Contributing

When adding new components to the library:

1. Create the component in `/src/components/ui/` or `/src/components/layout/`
2. Export it from the appropriate `index.ts` file
3. Add TypeScript interfaces for all props
4. Include dark mode support
5. Document the component in this file
6. Add usage examples
7. Test in both light and dark modes
