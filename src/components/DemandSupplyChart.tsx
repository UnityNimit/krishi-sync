import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react'
import { DemandSupplyData } from '../data/priceHistoryData'
import { AIPredictionLoader, MLModelIndicator } from './ui'

interface DemandSupplyChartProps {
  data: DemandSupplyData
}

function DemandSupplyChart({ data }: DemandSupplyChartProps) {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'))
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadForecast = () => {
    setIsLoading(true)
    // Loading will be handled by AIPredictionLoader component
  }
  
  const handleLoadingComplete = () => {
    setLastUpdated(new Date())
    setIsLoading(false)
  }

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    loadForecast()
  }, [data.crop])
  const chartData = data.months.map((month, index) => ({
    month,
    demand: data.demandForecast[index],
    supply: data.supplyForecast[index],
    gap: data.supplyForecast[index] - data.demandForecast[index]
  }))
  
  const balanceColor = data.marketBalance === 'surplus' 
    ? 'text-blue-600 dark:text-blue-400' 
    : data.marketBalance === 'deficit'
    ? 'text-red-600 dark:text-red-400'
    : 'text-green-600 dark:text-green-400'
    
  const balanceIcon = data.marketBalance === 'surplus'
    ? AlertCircle
    : data.marketBalance === 'deficit'
    ? AlertTriangle
    : CheckCircle
    
  const BalanceIcon = balanceIcon
  
  const demandTrendIcon = data.demandTrend === 'increasing'
    ? TrendingUp
    : data.demandTrend === 'decreasing'
    ? TrendingDown
    : Minus
    
  const supplyTrendIcon = data.supplyTrend === 'increasing'
    ? TrendingUp
    : data.supplyTrend === 'decreasing'
    ? TrendingDown
    : Minus
    
  const DemandTrendIcon = demandTrendIcon
  const SupplyTrendIcon = supplyTrendIcon
  
  if (isLoading) {
    return (
      <AIPredictionLoader
        onComplete={handleLoadingComplete}
        complexity="medium"
        title="AI Demand-Supply Analysis..."
        subtitle="Analyzing market trends and computing forecasts"
      />
    )
  }
  
  return (
    <div className="space-y-4">
      <MLModelIndicator
        modelName="Demand-Supply Forecasting Model"
        accuracy="90.5"
        lastTrained="Oct 19, 2024"
        lastUpdated={lastUpdated || undefined}
        onRefresh={loadForecast}
        isRefreshing={isLoading}
      />
      
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{data.crop} Demand-Supply Analytics</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            6-month forecast with market balance insights
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
          data.marketBalance === 'surplus' 
            ? 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30' 
            : data.marketBalance === 'deficit'
            ? 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/30'
            : 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/30'
        }`}>
          <BalanceIcon className={`h-5 w-5 ${balanceColor}`} />
          <span className={`font-semibold capitalize ${balanceColor}`}>
            {data.marketBalance}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Demand</h4>
            <DemandTrendIcon className={`h-5 w-5 ${
              data.demandTrend === 'increasing' 
                ? 'text-red-600 dark:text-red-400' 
                : data.demandTrend === 'decreasing'
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-400'
            }`} />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {(data.currentDemand / 1000).toFixed(1)}K MT
          </p>
          <p className={`text-sm mt-1 capitalize ${
            data.demandTrend === 'increasing' 
              ? 'text-red-600 dark:text-red-400' 
              : data.demandTrend === 'decreasing'
              ? 'text-green-600 dark:text-green-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {data.demandTrend}
          </p>
        </div>
        
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Supply</h4>
            <SupplyTrendIcon className={`h-5 w-5 ${
              data.supplyTrend === 'increasing' 
                ? 'text-green-600 dark:text-green-400' 
                : data.supplyTrend === 'decreasing'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-400'
            }`} />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {(data.currentSupply / 1000).toFixed(1)}K MT
          </p>
          <p className={`text-sm mt-1 capitalize ${
            data.supplyTrend === 'increasing' 
              ? 'text-green-600 dark:text-green-400' 
              : data.supplyTrend === 'decreasing'
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {data.supplyTrend}
          </p>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="month" 
              style={{ fontSize: '12px', fill: isDark ? '#9ca3af' : '#6b7280' }}
              stroke={isDark ? '#9ca3af' : '#6b7280'}
            />
            <YAxis 
              style={{ fontSize: '12px', fill: isDark ? '#9ca3af' : '#6b7280' }}
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              label={{ value: 'Quantity (MT)', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: isDark ? '#9ca3af' : '#6b7280' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1f2937' : 'white',
                color: isDark ? '#f3f4f6' : '#111827',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: number) => [`${value.toLocaleString()} MT`, '']}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', color: isDark ? '#9ca3af' : '#6b7280' }}
            />
            <Bar dataKey="demand" fill={isDark ? '#f87171' : '#ef4444'} name="Demand" radius={[4, 4, 0, 0]} />
            <Bar dataKey="supply" fill={isDark ? '#34d399' : '#10b981'} name="Supply" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`rounded-lg p-4 ${
          data.marketBalance === 'deficit' 
            ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700' 
            : 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
        }`}>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Market Gap Analysis</h4>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {Math.abs(data.currentSupply - data.currentDemand).toLocaleString()} MT
          </p>
          <p className={`text-sm mt-1 ${
            data.marketBalance === 'deficit' ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'
          }`}>
            {data.marketBalance === 'deficit' 
              ? 'Supply shortage requiring immediate intervention'
              : data.marketBalance === 'surplus'
              ? 'Excess supply may lead to price depression'
              : 'Market well-balanced'
            }
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">6-Month Outlook</h4>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            Gap {chartData[chartData.length - 1].gap > 0 ? 'Widening' : 'Narrowing'}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            Expected gap in Month +5: {Math.abs(chartData[chartData.length - 1].gap).toLocaleString()} MT
          </p>
        </div>
      </div>
      
      {data.marketBalance === 'deficit' && (
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-600 dark:border-red-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-red-900 dark:text-red-200">Policy Intervention Recommended</h4>
              <p className="text-sm text-red-800 dark:text-red-300 mt-1">
                Current deficit of {Math.abs(data.currentSupply - data.currentDemand).toLocaleString()} MT 
                requires immediate policy action. Consider production incentives, import facilitation, 
                or strategic reserve release.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {data.marketBalance === 'surplus' && (
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 dark:border-blue-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200">Market Stabilization Needed</h4>
              <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">
                Surplus of {Math.abs(data.currentSupply - data.currentDemand).toLocaleString()} MT 
                may depress prices. Consider procurement support, export promotion, 
                or value-addition programs.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DemandSupplyChart
