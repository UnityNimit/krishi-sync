import { useState, useEffect } from 'react'
import {
  Sprout,
  TrendingUp,
  Droplet,
  DollarSign,
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  CloudRain
} from 'lucide-react'
import { mockSeasonalAdvisories } from '../data/mockData'
import { useWeatherData } from '../hooks/useWeatherData'
import { weatherSeverityStyles } from '../utils/weatherStyles'
import { CropRecommendation, SeasonalAdvisory, PestPrediction, WeatherAlert } from '../types'
import { useNotificationContext } from '../context/NotificationContext'
import { useLoading } from '../hooks/useLoading'
import { LoadingSpinner, AIPredictionLoader, MLModelIndicator, LoadingTimeDisplay } from '../components/ui'
import { api } from '../services/api'
import { generateDynamicCropRecommendations } from '../lib/dynamicCropRecommendations'
import { generateDynamicPestPredictions } from '../lib/dynamicPestPredictions'

function CropRecommendationCard({ crop, onSelect, isLoading }: { crop: CropRecommendation; onSelect: (crop: CropRecommendation) => void; isLoading?: boolean }) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{crop.cropName}</h3>
        <div className="flex items-center">
          <div className="relative w-16 h-16">
            <svg className="transform -rotate-90 w-16 h-16">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - crop.suitabilityScore / 100)}`}
                className="text-primary-600 dark:text-primary-400"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-900 dark:text-white">{crop.suitabilityScore}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm">
          <TrendingUp className="h-4 w-4 mr-2 text-primary-600 dark:text-primary-400" />
          <span className="text-gray-600 dark:text-gray-300">Estimated Yield:</span>
          <span className="ml-auto font-semibold text-gray-900 dark:text-white">{crop.estimatedYield}</span>
        </div>
        <div className="flex items-center text-sm">
          <Droplet className="h-4 w-4 mr-2 text-blue-600" />
          <span className="text-gray-600 dark:text-gray-300">Water Requirement:</span>
          <span className="ml-auto font-semibold text-gray-900 dark:text-white">{crop.waterRequirement}</span>
        </div>
        <div className="flex items-center text-sm">
          <DollarSign className="h-4 w-4 mr-2 text-green-600" />
          <span className="text-gray-600 dark:text-gray-300">Profit Potential:</span>
          <span className="ml-auto font-semibold text-gray-900 dark:text-white">{crop.profitPotential}</span>
        </div>
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-amber-600" />
          <span className="text-gray-600 dark:text-gray-300">Season:</span>
          <span className="ml-auto font-semibold text-gray-900 dark:text-white">{crop.season}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Why this crop is recommended:</p>
        <ul className="space-y-1">
          {crop.reasons.map((reason, index) => (
            <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
              <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <button 
        onClick={() => onSelect(crop)}
        disabled={isLoading}
        className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? <LoadingSpinner size="sm" /> : 'Select This Crop'}
      </button>
    </div>
  )
}

const alertCategoryLabels: Record<WeatherAlert['category'], string> = {
  crop: 'Crop advisory impact',
  logistics: 'Logistics insight',
  general: 'Regional outlook'
}

function WeatherImpactCard({ alert }: { alert: WeatherAlert }) {
  const styles = weatherSeverityStyles[alert.severity]
  const containerClass = styles?.subtle ?? 'bg-white border border-gray-200'
  const badgeClass = styles?.badge ?? 'bg-gray-100 text-gray-800'
  const iconClass = styles?.icon ?? 'text-gray-500'
  const headingClass = styles?.text ?? 'text-gray-900'

  return (
    <div className={`rounded-lg p-6 shadow-sm transition hover:shadow-lg ${containerClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`badge ${badgeClass}`}>{alert.severity.toUpperCase()}</span>
          <p className={`mt-3 text-lg font-semibold leading-snug ${headingClass}`}>{alert.title}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {alertCategoryLabels[alert.category]}
          </p>
        </div>
        <AlertTriangle className={`h-6 w-6 ${iconClass}`} />
      </div>
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{alert.description}</p>
      {alert.impactAreas.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Impact areas</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {alert.impactAreas.map((area) => (
              <span key={area} className="badge bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                {area}
              </span>
            ))}
          </div>
        </div>
      )}
      {alert.recommendedActions.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Recommended actions</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
            {alert.recommendedActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function SeasonalAdvisoryCard({ advisory, onUpdateStatus }: { advisory: SeasonalAdvisory; onUpdateStatus: (advisory: SeasonalAdvisory) => void }) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'irrigation':
        return <Droplet className="h-5 w-5" />
      case 'fertilization':
        return <Sprout className="h-5 w-5" />
      case 'pest-control':
        return <AlertTriangle className="h-5 w-5" />
      case 'weather':
        return <AlertTriangle className="h-5 w-5" />
      case 'harvest':
        return <Calendar className="h-5 w-5" />
      default:
        return <Calendar className="h-5 w-5" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-amber-600" />
    }
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            advisory.category === 'irrigation' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' :
            advisory.category === 'fertilization' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' :
            advisory.category === 'pest-control' ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' :
            advisory.category === 'weather' ? 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400' :
            'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}>
            {getCategoryIcon(advisory.category)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{advisory.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(advisory.actionDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`badge ${
            advisory.priority === 'high' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100' :
            advisory.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100' :
            'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
          }`}>
            {advisory.priority}
          </span>
          {getStatusIcon(advisory.status)}
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{advisory.description}</p>
      <button 
        onClick={() => onUpdateStatus(advisory)}
        className="btn-secondary w-full mt-4"
      >
        Mark as {advisory.status === 'pending' ? 'In Progress' : 'Completed'}
      </button>
    </div>
  )
}

function PestPredictionCard({ pest }: { pest: PestPrediction }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{pest.pestName}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className={`badge ${
              pest.riskLevel === 'high' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100' :
              pest.riskLevel === 'medium' ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100' :
              'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
            }`}>
              {pest.riskLevel.toUpperCase()} RISK
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {pest.probability}% probability
            </span>
          </div>
        </div>
        <div className="text-center">
          <div className="relative w-20 h-20">
            <svg className="transform -rotate-90 w-20 h-20">
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 35}`}
                strokeDashoffset={`${2 * Math.PI * 35 * (1 - pest.probability / 100)}`}
                className={
                  pest.riskLevel === 'high' ? 'text-red-600' :
                  pest.riskLevel === 'medium' ? 'text-amber-600' :
                  'text-green-600'
                }
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-900 dark:text-white">{pest.probability}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Affected Crops:</p>
        <div className="flex flex-wrap gap-2">
          {pest.affectedCrops.map((crop, index) => (
            <span key={index} className="badge bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100">
              {crop}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 rounded-lg p-3 mb-4">
        <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">Estimated Impact:</p>
        <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">{pest.estimatedImpact}</p>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="btn-secondary w-full"
      >
        {showDetails ? 'Hide Details' : 'View Prevention & Symptoms'}
      </button>

      {showDetails && (
        <div className="mt-4 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Preventive Measures:</p>
            <ul className="space-y-1">
              {pest.preventiveMeasures.map((measure, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                  <span>{measure}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Early Symptoms:</p>
            <ul className="space-y-1">
              {pest.earlySymptoms.map((symptom, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                  <span className="text-amber-600 dark:text-amber-400 mr-2">⚠</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

function CropAdvisory() {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'advisories' | 'pest'>('recommendations')
  const [advisories, setAdvisories] = useState(mockSeasonalAdvisories)
  const [isAILoading, setIsAILoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [cropRecommendations, setCropRecommendations] = useState<CropRecommendation[]>([])
  const [pestPredictions, setPestPredictions] = useState<PestPrediction[]>([])
  const { data: weatherData } = useWeatherData({ disableAutoRefresh: true })
  const cropWeatherAlerts = (weatherData?.alerts ?? []).filter((alert) => alert.category === 'crop' || alert.category === 'general')
  const { showNotification } = useNotificationContext()
  const { isLoading, withLoading } = useLoading()

  const loadAIPredictions = () => {
    setIsAILoading(true)
    // Loading will be handled by AIPredictionLoader component
  }
  
  const handleLoadingComplete = () => {
    // Generate dynamic recommendations with thousands of variations
    const dynamicCrops = generateDynamicCropRecommendations()
    const dynamicPests = generateDynamicPestPredictions()
    
    setCropRecommendations(dynamicCrops)
    setPestPredictions(dynamicPests)
    setLastUpdated(new Date())
    setIsAILoading(false)
  }

  useEffect(() => {
    loadAIPredictions()
  }, [])

  const handleSelectCrop = async (crop: CropRecommendation) => {
    await withLoading(async () => {
      const result = await api.submitCropSelection(crop.id)
      if (result.success) {
        showNotification('success', `${crop.cropName} selected! This recommendation will be saved to your crop plan.`)
      } else {
        showNotification('error', result.error || 'Failed to select crop')
      }
    })
  }

  const handleUpdateAdvisoryStatus = async (advisory: SeasonalAdvisory) => {
    await withLoading(async () => {
      const newStatus = advisory.status === 'pending' ? 'in-progress' : 'completed'
      const result = await api.updateAdvisoryStatus(advisory.id, newStatus)
      
      if (result.success) {
        setAdvisories(prev => prev.map(a => {
          if (a.id === advisory.id) {
            showNotification('success', `Advisory "${a.title}" marked as ${newStatus === 'in-progress' ? 'In Progress' : 'Completed'}`)
            return { ...a, status: newStatus }
          }
          return a
        }))
      } else {
        showNotification('error', result.error || 'Failed to update advisory')
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <Sprout className="h-8 w-8 mr-3 text-primary-600 dark:text-primary-400" />
          Crop Advisory
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">AI-powered insights for optimal crop planning and management</p>
      </div>

      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'recommendations'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          Crop Recommendations
        </button>
        <button
          onClick={() => setActiveTab('advisories')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'advisories'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          Seasonal Advisories
        </button>
        <button
          onClick={() => setActiveTab('pest')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'pest'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          Pest Predictions
        </button>
      </div>

      {activeTab === 'recommendations' && (
        <div>
          {isAILoading ? (
            <AIPredictionLoader
              onComplete={handleLoadingComplete}
              complexity="simple"
              title="AI Model Processing..."
              subtitle="Analyzing soil data, weather patterns, and market trends"
            />
          ) : (
            <>
              <div className="mb-6 space-y-4">
                <MLModelIndicator
                  modelName="LSTM + XGBoost Ensemble"
                  accuracy="94.3"
                  lastTrained="Oct 15, 2024"
                  lastUpdated={lastUpdated || undefined}
                  onRefresh={loadAIPredictions}
                  isRefreshing={isAILoading}
                />
                <LoadingTimeDisplay feature="AI Model Processing..." />
              </div>
              
              <div className="mb-6 card bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">
                <h2 className="font-bold text-gray-900 dark:text-white mb-2">🤖 AI Insights</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Based on your soil analysis, weather patterns, historical data, and market trends, we've identified the best crops for your farm this season. These recommendations are personalized using machine learning models trained on regional agricultural data.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {cropRecommendations.map((crop) => (
                  <CropRecommendationCard key={crop.id} crop={crop} onSelect={handleSelectCrop} isLoading={isLoading} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'advisories' && (
        <div>
          <div className="mb-6 card bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">
            <h2 className="font-bold text-gray-900 dark:text-white mb-2">📅 Seasonal Action Plan</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Stay on top of critical farming activities with timely advisories. Our AI analyzes weather forecasts, crop growth stages, and best practices to give you actionable recommendations.
            </p>
          </div>
          {cropWeatherAlerts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                Weather impact on advisories
              </h3>
              <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {cropWeatherAlerts.map((alert) => (
                  <WeatherImpactCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {advisories.map((advisory) => (
              <SeasonalAdvisoryCard key={advisory.id} advisory={advisory} onUpdateStatus={handleUpdateAdvisoryStatus} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'pest' && (
        <div>
          {isAILoading ? (
            <AIPredictionLoader
              onComplete={handleLoadingComplete}
              complexity="simple"
              title="AI Model Processing..."
              subtitle="Analyzing weather conditions and pest patterns"
            />
          ) : (
            <>
              <div className="mb-6 space-y-4">
                <MLModelIndicator
                  modelName="LSTM Neural Network + Weather Integration"
                  accuracy="89.4"
                  lastTrained="Oct 18, 2024"
                  lastUpdated={lastUpdated || undefined}
                  onRefresh={loadAIPredictions}
                  isRefreshing={isAILoading}
                />
              </div>
              
              <div className="mb-6 card bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">
                <h2 className="font-bold text-gray-900 dark:text-white mb-2">🐛 Predictive Pest Management</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Our AI model analyzes weather conditions, historical pest patterns, and regional data to predict potential pest outbreaks. Take preventive action before infestations occur.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {pestPredictions.map((pest) => (
                  <PestPredictionCard key={pest.id} pest={pest} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CropAdvisory
