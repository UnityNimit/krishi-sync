import { useState, ReactNode } from 'react'

export interface Tab {
  id: string
  label: string
  icon?: ReactNode
  content: ReactNode
  disabled?: boolean
}

export interface TabPanelProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
  className?: string
  variant?: 'line' | 'pills'
}

export function TabPanel({ 
  tabs, 
  defaultTab, 
  onChange,
  className = '',
  variant = 'line'
}: TabPanelProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  const isLineVariant = variant === 'line'

  return (
    <div className={className}>
      <div className={`${isLineVariant ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
        <nav className={`${isLineVariant ? '-mb-px flex space-x-8' : 'flex flex-wrap gap-2'}`}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && handleTabChange(tab.id)}
                disabled={tab.disabled}
                className={`
                  ${isLineVariant 
                    ? `
                      border-b-2 py-2 px-1 text-sm font-medium transition-colors
                      ${isActive 
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                      }
                    `
                    : `
                      px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
                    `
                  }
                  ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  flex items-center gap-2
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>
      <div className="mt-4">
        {activeTabContent}
      </div>
    </div>
  )
}
