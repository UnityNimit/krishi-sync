import { useEffect, useState } from 'react'
import { Brain } from 'lucide-react'

interface LoadingStepProps {
  step: string
  delay: number
}

function LoadingStep({ step, delay }: LoadingStepProps) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  
  if (!visible) return null
  
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>{step}</span>
    </div>
  )
}

interface AILoadingAnimationProps {
  steps?: string[]
  title?: string
  subtitle?: string
}

export function AILoadingAnimation({ 
  steps = [
    'Loading historical data',
    'Analyzing patterns',
    'Computing predictions',
    'Calculating confidence intervals'
  ],
  title = 'AI Model Processing...',
  subtitle = 'Analyzing data with machine learning models'
}: AILoadingAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          {subtitle}
        </p>
      </div>
      
      <div className="mt-8 space-y-2">
        {steps.map((step, index) => (
          <LoadingStep key={index} step={step} delay={index * 500} />
        ))}
      </div>
    </div>
  )
}

export function AIProcessingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-48 h-48">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${50 + 40 * Math.cos((i * 2 * Math.PI) / 12)}%`,
              top: `${50 + 40 * Math.sin((i * 2 * Math.PI) / 12)}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          AI Model Processing
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Training on 10,000+ historical data points...
        </p>
      </div>
    </div>
  )
}
