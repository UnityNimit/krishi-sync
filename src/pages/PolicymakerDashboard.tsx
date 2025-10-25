import { useState, useEffect } from 'react'
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Factory,
  Package,
  MapPin,
  Filter,
  BarChart3,
  AlertCircle,
  FileText,
  Download,
  Map as MapIcon
} from 'lucide-react'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { policymakerData, statesList, seasonsList } from '../data/policymakerData'
import LogisticsMap from '../components/LogisticsMap'
import { logisticsGeoData } from '../data/logisticsGeoData'
import { useNotificationContext } from '../context/NotificationContext'
import { AIPredictionLoader, MLModelIndicator } from '../components/ui'

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']

function PolicymakerDashboard() {
  
  const [selectedState, setSelectedState] = useState<string>('all')
  const [selectedSeason, setSelectedSeason] = useState<string>('all')
  const { showNotification } = useNotificationContext()
  const [isExporting, setIsExporting] = useState(false)
  const [isAILoading, setIsAILoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadPolicyData = () => {
    setIsAILoading(true)
    // Loading will be handled by AIPredictionLoader component
  }
  
  const handleLoadingComplete = () => {
    setLastUpdated(new Date())
    setIsAILoading(false)
  }

  useEffect(() => {
    loadPolicyData()
  }, [])

  const filteredData = policymakerData.filter(data => {
    const stateMatch = selectedState === 'all' || data.state === selectedState
    const seasonMatch = selectedSeason === 'all' || data.season === selectedSeason
    return stateMatch && seasonMatch
  })

  const aggregatedKPIs = {
    importDependency: filteredData.reduce((sum, d) => sum + d.importDependency, 0) / filteredData.length || 0,
    productionTarget: filteredData.reduce((sum, d) => sum + d.productionTarget, 0),
    productionActual: filteredData.reduce((sum, d) => sum + d.productionActual, 0),
    processingCapacity: filteredData.reduce((sum, d) => sum + d.processingCapacity, 0),
    processingUtilization: filteredData.reduce((sum, d) => sum + d.processingUtilization, 0) / filteredData.length || 0
  }

  const productionVsDemandData = filteredData.flatMap(d => 
    d.productionVsDemand.map(point => ({
      ...point,
      crop: d.crop
    }))
  ).reduce((acc, curr) => {
    const existing = acc.find(item => item.month === curr.month)
    if (existing) {
      existing.production += curr.production
      existing.demand += curr.demand
    } else {
      acc.push({ ...curr })
    }
    return acc
  }, [] as Array<{month: string, production: number, demand: number, crop: string}>)

  const importReductionData = filteredData.flatMap(d =>
    d.importReduction.map(point => ({
      ...point,
      crop: d.crop
    }))
  ).reduce((acc, curr) => {
    const existing = acc.find(item => item.quarter === curr.quarter)
    if (existing) {
      existing.importVolume += curr.importVolume
      existing.targetReduction += curr.targetReduction
    } else {
      acc.push({ ...curr })
    }
    return acc
  }, [] as Array<{quarter: string, importVolume: number, targetReduction: number, crop: string}>)

  const cropDistributionData = filteredData.map(d => ({
    name: d.crop,
    value: d.productionActual,
    target: d.productionTarget
  }))

  const targetAchievementRate = (aggregatedKPIs.productionActual / aggregatedKPIs.productionTarget * 100) || 0
  const importReductionRate = importReductionData.length > 0 
    ? ((importReductionData[0].importVolume - importReductionData[importReductionData.length - 1].importVolume) / importReductionData[0].importVolume * 100)
    : 0

  if (isAILoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Brain className="h-8 w-8 mr-3 text-primary-600 dark:text-primary-400" />
            Policymaker Intelligence Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
            Strategic insights for agricultural policy and planning
          </p>
        </div>
        <AIPredictionLoader
          onComplete={handleLoadingComplete}
          complexity="complex"
          title="AI Model Processing..."
          subtitle="Analyzing national agricultural data and generating insights"
        />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <Brain className="h-8 w-8 mr-3 text-primary-600 dark:text-primary-400" />
          Policymaker Intelligence Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
          Strategic insights for agricultural policy and planning
        </p>
      </div>

      <MLModelIndicator
        modelName="Multi-Region Demand-Supply Forecasting Model"
        accuracy="91.8"
        lastTrained="Oct 22, 2024"
        lastUpdated={lastUpdated || undefined}
        onRefresh={loadPolicyData}
        isRefreshing={isAILoading}
      />

      <div className="card bg-gradient-to-r from-primary-50 via-blue-50 to-indigo-50 dark:from-primary-900/30 dark:via-blue-900/30 dark:to-indigo-900/30 border-primary-200 dark:border-primary-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Data Filters</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Refine insights by state and season
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="form-select px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400"
              >
                <option value="all">All States</option>
                {statesList.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                Season
              </label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="form-select px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400"
              >
                <option value="all">All Seasons</option>
                {seasonsList.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-200 dark:border-red-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                <p className="text-sm font-semibold text-red-800 dark:text-red-200 uppercase tracking-wide">Import Dependency</p>
              </div>
              <p className="text-4xl font-bold text-red-900 dark:text-red-100">{aggregatedKPIs.importDependency.toFixed(1)}%</p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-2">
                For critical oilseeds
              </p>
            </div>
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
              aggregatedKPIs.importDependency < 20 ? 'bg-green-200 dark:bg-green-900' : 
              aggregatedKPIs.importDependency < 40 ? 'bg-amber-200 dark:bg-amber-900' : 'bg-red-200 dark:bg-red-900'
            }`}>
              <AlertCircle className={`h-6 w-6 ${
                aggregatedKPIs.importDependency < 20 ? 'text-green-700 dark:text-green-300' : 
                aggregatedKPIs.importDependency < 40 ? 'text-amber-700 dark:text-amber-300' : 'text-red-700 dark:text-red-300'
              }`} />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wide">Production vs Target</p>
              </div>
              <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">
                {(aggregatedKPIs.productionTarget / 1000).toFixed(1)}K MT
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                Achievement: {targetAchievementRate.toFixed(1)}%
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-200 dark:bg-blue-900">
              <TrendingUp className="h-6 w-6 text-blue-700 dark:text-blue-300" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Factory className="h-5 w-5 text-green-600 dark:text-green-400" />
                <p className="text-sm font-semibold text-green-800 dark:text-green-200 uppercase tracking-wide">Processing Capacity</p>
              </div>
              <p className="text-4xl font-bold text-green-900 dark:text-green-100">
                {(aggregatedKPIs.processingCapacity / 1000).toFixed(1)}K MT
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                Utilization: {aggregatedKPIs.processingUtilization.toFixed(1)}%
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-200 dark:bg-green-900">
              <Factory className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200 dark:border-purple-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <p className="text-sm font-semibold text-purple-800 dark:text-purple-200 uppercase tracking-wide">Import Reduction Target</p>
              </div>
              <p className="text-4xl font-bold text-purple-900 dark:text-purple-100">
                {importReductionRate > 0 ? '+' : ''}{importReductionRate.toFixed(1)}%
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">
                {importReductionRate > 0 ? 'Target on track' : 'Needs attention'}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-200 dark:bg-purple-900">
              <BarChart3 className="h-6 w-6 text-purple-700 dark:text-purple-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
              Production vs Demand Analysis
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Track production levels against market demand
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={productionVsDemandData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              style={{ fontSize: '12px', fontWeight: 500 }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px', fontWeight: 500 }}
              label={{ value: 'Metric Tons', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#6b7280' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '14px', fontWeight: 500 }}
            />
            <Line 
              type="monotone" 
              dataKey="production" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
              name="Production"
            />
            <Line 
              type="monotone" 
              dataKey="demand" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Demand"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
                Import Reduction Trend
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Quarterly progress on reducing import dependency
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={importReductionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="quarter" 
                stroke="#6b7280"
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '14px', fontWeight: 500 }}
              />
              <Bar dataKey="importVolume" fill="#ef4444" name="Import Volume (MT)" />
              <Bar dataKey="targetReduction" fill="#10b981" name="Target Reduction (MT)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Package className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
                Crop Production Distribution
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Current production by commodity
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cropDistributionData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {cropDistributionData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <MapIcon className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
              Supply Chain Infrastructure Map
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Geospatial overview of warehouses, processing units, and active logistics routes
            </p>
          </div>
        </div>
        <LogisticsMap 
          warehouses={logisticsGeoData.warehouses}
          processingUnits={logisticsGeoData.processingUnits}
          routes={logisticsGeoData.routes}
          className="h-[500px]"
        />
      </div>

      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Narrative Insights & Policy Recommendations
            </h2>
            <div className="mt-4 space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 border border-blue-200 dark:border-blue-600 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Regional Production Gaps
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {selectedState === 'all' ? 'National analysis shows' : `${selectedState} analysis shows`} that 
                  current production levels are {targetAchievementRate >= 95 ? 'meeting' : 'falling short of'} targets 
                  by {Math.abs(100 - targetAchievementRate).toFixed(1)}%. 
                  {targetAchievementRate < 95 && ' Recommend incentivizing production through targeted subsidies and improved access to quality inputs.'}
                </p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 border border-blue-200 dark:border-blue-600 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Factory className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Processing Capacity Utilization
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  Current processing infrastructure operates at {aggregatedKPIs.processingUtilization.toFixed(1)}% capacity. 
                  {aggregatedKPIs.processingUtilization < 70 && ' Underutilization suggests potential for increased throughput without additional capital investment.'}
                  {aggregatedKPIs.processingUtilization >= 70 && aggregatedKPIs.processingUtilization < 90 && ' Capacity utilization is optimal for current demand levels.'}
                  {aggregatedKPIs.processingUtilization >= 90 && ' Near-capacity operations indicate need for infrastructure expansion to support growth.'}
                </p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 border border-blue-200 dark:border-blue-600 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Import Dependency Strategy
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  Import dependency at {aggregatedKPIs.importDependency.toFixed(1)}% represents 
                  {aggregatedKPIs.importDependency < 20 ? ' minimal exposure to global market volatility. Continue monitoring to maintain self-sufficiency.' : 
                   aggregatedKPIs.importDependency < 40 ? ' moderate reliance on external sources. Strategic initiatives to boost domestic production recommended.' :
                   ' significant vulnerability to supply chain disruptions. Urgent policy intervention needed to enhance domestic capacity.'}
                  {importReductionRate > 0 && ` Current trajectory shows ${importReductionRate.toFixed(1)}% reduction, indicating effective policy implementation.`}
                </p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 border border-blue-200 dark:border-blue-600 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Seasonal Considerations
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {selectedSeason === 'all' ? 'Year-round data reflects' : `${selectedSeason} season data highlights`} the 
                  importance of aligning production cycles with market demand patterns. Peak demand periods require enhanced 
                  logistics coordination and strategic buffer stock management to stabilize prices and ensure supply security.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button 
              onClick={async () => {
                setIsExporting(true)
                try {
                  await new Promise(resolve => setTimeout(resolve, 1500))
                  showNotification('success', 'Report exported successfully! Check your downloads folder.')
                } catch {
                  showNotification('error', 'Failed to export report')
                } finally {
                  setIsExporting(false)
                }
              }}
              disabled={isExporting}
              className="btn-primary flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export Report'}
            </button>
            <button 
              onClick={() => {
                showNotification('info', 'Full analysis document will be generated and sent to your registered email.')
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center whitespace-nowrap"
            >
              <FileText className="h-4 w-4 mr-2" />
              Full Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PolicymakerDashboard
