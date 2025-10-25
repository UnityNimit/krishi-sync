import {
  Home,
  Users,
  ShoppingCart,
  Sprout,
  TrendingUp,
  Link2,
  Brain,
  MapPin,
  Package,
  BarChart3,
  FileText
} from 'lucide-react'
import { NavigationItem } from '../types/navigation'

export const farmerNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: Home
  },
  {
    id: 'crop-advisory',
    label: 'Crop Advisory',
    path: '/crop-advisory',
    icon: Sprout
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    path: '/marketplace',
    icon: ShoppingCart
  },
  {
    id: 'credit',
    label: 'Credit & Insurance',
    path: '/credit-insurance',
    icon: TrendingUp
  },
  {
    id: 'traceability',
    label: 'Traceability',
    path: '/traceability',
    icon: Link2
  }
]

export const buyerNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: Home
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    path: '/marketplace',
    icon: ShoppingCart
  },
  {
    id: 'suppliers',
    label: 'Suppliers',
    path: '/stakeholders',
    icon: Users
  },
  {
    id: 'traceability',
    label: 'Product Tracing',
    path: '/traceability',
    icon: Link2
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3
  }
]

export const policymakerNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Intelligence Dashboard',
    path: '/dashboard/policymaker',
    icon: Brain
  },
  {
    id: 'production',
    label: 'Production Analytics',
    path: '/analytics/production',
    icon: BarChart3
  },
  {
    id: 'logistics',
    label: 'Logistics Network',
    path: '/analytics/logistics',
    icon: MapPin
  },
  {
    id: 'market',
    label: 'Market Insights',
    path: '/analytics/market',
    icon: TrendingUp
  },
  {
    id: 'reports',
    label: 'Reports',
    path: '/reports',
    icon: FileText
  }
]

export const logisticsNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: Home
  },
  {
    id: 'routes',
    label: 'Routes',
    path: '/routes',
    icon: MapPin
  },
  {
    id: 'shipments',
    label: 'Shipments',
    path: '/shipments',
    icon: Package
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    path: '/marketplace',
    icon: ShoppingCart
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3
  }
]

export const defaultNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: Home
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    path: '/marketplace',
    icon: ShoppingCart
  },
  {
    id: 'stakeholders',
    label: 'Stakeholders',
    path: '/stakeholders',
    icon: Users
  },
  {
    id: 'crop-advisory',
    label: 'Crop Advisory',
    path: '/crop-advisory',
    icon: Sprout
  },
  {
    id: 'credit-insurance',
    label: 'Credit & Insurance',
    path: '/credit-insurance',
    icon: TrendingUp
  },
  {
    id: 'traceability',
    label: 'Traceability',
    path: '/traceability',
    icon: Link2
  },
  {
    id: 'policymaker',
    label: 'Policymaker',
    path: '/dashboard/policymaker',
    icon: Brain
  }
]

export function getNavigationForStakeholder(stakeholder?: string): NavigationItem[] {
  switch (stakeholder) {
    case 'farmer':
      return farmerNavigation
    case 'buyer':
      return buyerNavigation
    case 'policymaker':
      return policymakerNavigation
    case 'logistics':
      return logisticsNavigation
    default:
      return defaultNavigation
  }
}
