import { LucideIcon } from 'lucide-react'

export interface NavigationItem {
  id: string
  label: string
  path: string
  icon?: LucideIcon
  badge?: string | number
  disabled?: boolean
  children?: NavigationItem[]
}

export interface RouteMetadata {
  title?: string
  description?: string
  stakeholder?: 'farmer' | 'buyer' | 'policymaker' | 'logistics' | 'all'
  navigation?: NavigationItem[]
  breadcrumbs?: Array<{ label: string; path?: string }>
}

export interface DashboardLayoutConfig {
  appName: string
  logo?: React.ReactNode
  navigation: NavigationItem[]
  showSidebar?: boolean
  showTopbar?: boolean
  sidebarCollapsible?: boolean
  userMenu?: React.ReactNode
  footer?: React.ReactNode
}
