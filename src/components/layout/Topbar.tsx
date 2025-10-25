import { Link, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun } from 'lucide-react'
import { NavigationItem } from '../../types/navigation'
import { ReactNode, useState, useEffect } from 'react'

export interface TopbarProps {
  appName: string
  logo?: ReactNode
  navigation: NavigationItem[]
  userMenu?: ReactNode
  onMenuClick?: () => void
  className?: string
}

export function Topbar({
  appName,
  logo,
  navigation,
  userMenu,
  onMenuClick,
  className = ''
}: TopbarProps) {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className={`bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="mr-3 p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <Link to="/" className="flex items-center">
              {logo}
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">{appName}</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-4 items-center">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                } ${item.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
              >
                {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                {item.label}
                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary-600 text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {userMenu}
          </div>
        </div>
      </div>
    </nav>
  )
}
