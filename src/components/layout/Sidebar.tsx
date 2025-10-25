import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { NavigationItem } from '../../types/navigation'
import { useState } from 'react'

export interface SidebarProps {
  navigation: NavigationItem[]
  collapsed?: boolean
  className?: string
}

function SidebarNavItem({ item, collapsed }: { item: NavigationItem; collapsed?: boolean }) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  
  const isActive = location.pathname === item.path
  const hasChildren = item.children && item.children.length > 0

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={item.disabled}
        >
          <div className="flex items-center flex-1 min-w-0">
            {item.icon && <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />}
            {!collapsed && <span className="truncate">{item.label}</span>}
            {!collapsed && item.badge && (
              <span className="ml-auto mr-2 px-2 py-0.5 text-xs rounded-full bg-primary-600 text-white">
                {item.badge}
              </span>
            )}
          </div>
          {!collapsed && (
            isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {isOpen && !collapsed && (
          <div className="ml-6 mt-1 space-y-1">
            {item.children?.map((child) => (
              <SidebarNavItem key={child.id} item={child} collapsed={collapsed} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      to={item.path}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      } ${item.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
    >
      {item.icon && <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />}
      {!collapsed && (
        <>
          <span className="truncate flex-1">{item.label}</span>
          {item.badge && (
            <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-primary-600 text-white">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  )
}

export function Sidebar({ navigation, collapsed = false, className = '' }: SidebarProps) {
  return (
    <aside
      className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } ${className}`}
    >
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <SidebarNavItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>
    </aside>
  )
}
