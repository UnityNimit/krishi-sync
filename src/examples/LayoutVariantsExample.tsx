import { DashboardLayout } from '../components/layout'
import { Card, MetricCard } from '../components/ui'
import { Sprout, Home, Users, Settings } from 'lucide-react'
import { NavigationItem } from '../types/navigation'

const sampleNav: NavigationItem[] = [
  { id: 'home', label: 'Home', path: '/', icon: Home },
  { id: 'users', label: 'Users', path: '/users', icon: Users },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings }
]

export function TopbarOnlyLayout() {
  return (
    <DashboardLayout
      config={{
        appName: 'TopBar Only',
        logo: <Sprout className="h-8 w-8 text-primary-600" />,
        navigation: sampleNav,
        showTopbar: true,
        showSidebar: false
      }}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Topbar Only Layout</h1>
        <Card>
          <p className="text-gray-600 dark:text-gray-400">
            This layout shows only the topbar with horizontal navigation.
            Perfect for simpler dashboards with fewer navigation items.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export function SidebarOnlyLayout() {
  return (
    <DashboardLayout
      config={{
        appName: 'Sidebar Only',
        logo: <Sprout className="h-8 w-8 text-primary-600" />,
        navigation: sampleNav,
        showTopbar: false,
        showSidebar: true,
        sidebarCollapsible: true
      }}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Sidebar Only Layout</h1>
        <Card>
          <p className="text-gray-600 dark:text-gray-400">
            This layout shows only the sidebar navigation.
            Useful for admin panels or data-heavy dashboards.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export function BothSidebarAndTopbarLayout() {
  return (
    <DashboardLayout
      config={{
        appName: 'Full Layout',
        logo: <Sprout className="h-8 w-8 text-primary-600" />,
        navigation: sampleNav,
        showTopbar: true,
        showSidebar: true,
        sidebarCollapsible: true
      }}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Full Layout (Topbar + Sidebar)</h1>
        <Card>
          <p className="text-gray-600 dark:text-gray-400">
            This layout combines both topbar and sidebar navigation.
            Best for complex applications with multiple navigation levels.
          </p>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Feature 1"
            value="100"
            variant="primary"
          />
          <MetricCard
            title="Feature 2"
            value="250"
            variant="success"
          />
          <MetricCard
            title="Feature 3"
            value="75"
            variant="info"
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export function LayoutWithUserMenu() {
  return (
    <DashboardLayout
      config={{
        appName: 'With User Menu',
        logo: <Sprout className="h-8 w-8 text-primary-600" />,
        navigation: sampleNav,
        showTopbar: true,
        showSidebar: false,
        userMenu: (
          <div className="flex items-center gap-2">
            <img
              src="https://via.placeholder.com/32"
              alt="User"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              John Doe
            </span>
          </div>
        )
      }}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Layout With User Menu</h1>
        <Card>
          <p className="text-gray-600 dark:text-gray-400">
            This layout includes a custom user menu in the topbar.
            You can add profile pictures, dropdowns, or any custom elements.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export function LayoutWithFooter() {
  return (
    <DashboardLayout
      config={{
        appName: 'With Footer',
        logo: <Sprout className="h-8 w-8 text-primary-600" />,
        navigation: sampleNav,
        showTopbar: true,
        showSidebar: false,
        footer: (
          <div className="px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 AgriAdvisory. All rights reserved.
          </div>
        )
      }}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Layout With Footer</h1>
        <Card>
          <p className="text-gray-600 dark:text-gray-400">
            This layout includes a footer section at the bottom.
            Perfect for adding copyright information, links, or other footer content.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  )
}
