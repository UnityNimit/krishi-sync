import { ReactNode, useState, useEffect } from 'react'
import { Topbar } from './Topbar'
import { Sidebar } from './Sidebar'
import { DashboardLayoutConfig } from '../../types/navigation'

export interface DashboardLayoutProps {
  children: ReactNode
  config: DashboardLayoutConfig
  className?: string
}

export function DashboardLayout({ children, config, className = '' }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  
  const {
    appName,
    logo,
    navigation,
    showSidebar = false,
    showTopbar = true,
    sidebarCollapsible = true,
    userMenu,
    footer
  } = config

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleSidebar = () => {
    if (sidebarCollapsible) {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${className}`}>
      {showTopbar && (
        <Topbar
          appName={appName}
          logo={logo}
          navigation={showSidebar ? [] : navigation}
          userMenu={userMenu}
          onMenuClick={showSidebar ? toggleMobileSidebar : undefined}
        />
      )}

      <div className="flex h-[calc(100vh-4rem)]">
        {showSidebar && (
          <>
            <div className="hidden lg:block">
              <Sidebar
                navigation={navigation}
                collapsed={sidebarCollapsed}
                className="h-full"
              />
            </div>

            {mobileSidebarOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={toggleMobileSidebar}
                />
                <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
                  <Sidebar navigation={navigation} className="h-full" />
                </div>
              </>
            )}
          </>
        )}

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
          {footer && (
            <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto">
              {footer}
            </footer>
          )}
        </main>
      </div>

      {showSidebar && sidebarCollapsible && (
        <button
          onClick={toggleSidebar}
          className="hidden lg:block fixed bottom-8 left-4 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform ${
              sidebarCollapsed ? 'rotate-180' : ''
            }`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  )
}
