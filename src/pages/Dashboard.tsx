import { Link } from 'react-router-dom'
import {
  Sprout,
  TrendingUp,
  AlertTriangle,
  Calendar,
  ArrowRight,
  CloudSun,
  Droplet,
  Wind,
  RefreshCcw,
  Thermometer,
  CloudRain,
  ShoppingCart
} from 'lucide-react'
import { mockSeasonalAdvisories, mockPestPredictions, mockCropRecommendations } from '../data/mockData'
import { mockMarketplaceLots } from '../data/marketplaceData'
import { useWeatherData } from '../hooks/useWeatherData'
import { formatForecastHour, formatRelativeTime, weatherSeverityStyles } from '../utils/weatherStyles'

function Dashboard() {
  const { data: weatherData, loading: weatherLoading, isFallback: weatherFallback, error: weatherError, refetch: refetchWeather } = useWeatherData()
  const forecastPreview = weatherData?.forecast.slice(0, 4) ?? []
  const alertPreview = weatherData?.alerts.slice(0, 3) ?? []
  const highPriorityAdvisories = mockSeasonalAdvisories.filter(a => a.priority === 'high').length
  const highRiskPests = mockPestPredictions.filter(p => p.riskLevel === 'high').length
  const topRecommendation = mockCropRecommendations[0]
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
  const activeMarketplaceLots = mockMarketplaceLots.filter((lot) => lot.status !== 'fulfilled')
  const marketplacePipelineValue = activeMarketplaceLots.reduce(
    (acc, lot) => acc + lot.bestOfferPerTon * lot.lotSizeTons,
    0
  )
  const leadMarketplaceLot = activeMarketplaceLots
    .slice()
    .sort((a, b) => b.engagementScore - a.engagementScore)[0]
  const marketplaceLotsInPlay = activeMarketplaceLots.length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to AgriAdvisory Platform</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Your comprehensive agricultural intelligence dashboard</p>
      </div>

      <div className="card bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 border-sky-200 dark:border-sky-700">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wide">Weather Overview</p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-sky-900 dark:text-sky-100">
                {weatherLoading || !weatherData ? '--' : `${weatherData.current.temperature}°C`}
              </span>
              <span className="text-sky-800 dark:text-sky-200 capitalize text-base">
                {weatherLoading || !weatherData ? 'Loading forecast...' : weatherData.current.description}
              </span>
            </div>
            <p className="mt-1 text-sm text-sky-800 dark:text-sky-200">
              {weatherData?.location ?? 'Detecting location...'}
            </p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/80 dark:bg-gray-800/80 border border-sky-100 dark:border-sky-700 rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
                  <Thermometer className="h-4 w-4" />
                  <span>Feels Like</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {weatherLoading || !weatherData ? '--' : `${weatherData.current.feelsLike}°C`}
                </p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 border border-sky-100 dark:border-sky-700 rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
                  <Droplet className="h-4 w-4" />
                  <span>Humidity</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {weatherLoading || !weatherData ? '--' : `${weatherData.current.humidity}%`}
                </p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 border border-sky-100 dark:border-sky-700 rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
                  <Wind className="h-4 w-4" />
                  <span>Wind</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {weatherLoading || !weatherData ? '--' : `${weatherData.current.windSpeed} km/h`}
                </p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 border border-sky-100 dark:border-sky-700 rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
                  <CloudRain className="h-4 w-4" />
                  <span>Rain Chance</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {weatherLoading || !weatherData ? '--' : `${weatherData.current.precipitationChance}%`}
                </p>
              </div>
            </div>
            {weatherFallback && (
              <p className="mt-3 text-xs font-medium text-sky-700 dark:text-sky-300">
                Showing simulated data
              </p>
            )}
            {weatherError && (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                {weatherError}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-3 text-right min-w-[150px]">
            <CloudSun className="h-12 w-12 text-sky-500 dark:text-sky-400" />
            <button
              type="button"
              onClick={refetchWeather}
              className="inline-flex items-center gap-1 text-xs font-medium text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-100 transition-colors"
            >
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </button>
            <p className="text-xs text-sky-700 dark:text-sky-300">
              {weatherData ? `Updated ${formatRelativeTime(weatherData.lastUpdated)}` : 'Awaiting update'}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">Upcoming Forecast</p>
          {forecastPreview.length === 0 ? (
            <p className="mt-2 text-sm text-sky-800 dark:text-sky-200">Forecast not available</p>
          ) : (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
              {forecastPreview.map((entry) => (
                <div key={entry.timestamp} className="bg-white/80 dark:bg-gray-800/80 border border-sky-100 dark:border-sky-700 rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-sky-700 dark:text-sky-300 font-semibold">{formatForecastHour(entry.timestamp)}</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{entry.temperature}°C</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Droplet className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                      {entry.precipitationChance}%
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                      {entry.windSpeed} km/h
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 capitalize leading-snug">{entry.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {alertPreview.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">Weather Alerts</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {alertPreview.map((alert) => {
                const badgeClass = weatherSeverityStyles[alert.severity]?.badge ?? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                return (
                  <span key={alert.id} className={`badge ${badgeClass}`}>
                    {`${alert.severity.toUpperCase()} • ${alert.title}`}
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-300">Crop Recommendations</p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-2">{mockCropRecommendations.length}</p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">Available for Season</p>
            </div>
            <Sprout className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border-amber-200 dark:border-amber-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Active Alerts</p>
              <p className="text-3xl font-bold text-amber-900 dark:text-amber-100 mt-2">{highPriorityAdvisories}</p>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">High Priority Actions</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-amber-600 dark:text-amber-400" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-200 dark:border-red-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">Pest Risks</p>
              <p className="text-3xl font-bold text-red-900 dark:text-red-100 mt-2">{highRiskPests}</p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">High Risk Detected</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-r from-emerald-50 via-teal-50 to-primary-50 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-primary-900/30 border-emerald-200 dark:border-emerald-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
              Marketplace Pipeline
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {marketplaceLotsInPlay > 0
                ? `Tracking ${marketplaceLotsInPlay} active lots worth ${formatCurrency(marketplacePipelineValue)}`
                : 'All lots fulfilled'}
            </p>
            {leadMarketplaceLot && (
              <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-3">
                Spotlight: {leadMarketplaceLot.crop} from {leadMarketplaceLot.location} (Engagement Score: {leadMarketplaceLot.engagementScore})
              </p>
            )}
          </div>
          <Link
            to="/marketplace"
            className="btn-primary flex items-center justify-center w-full md:w-auto"
          >
            Open Marketplace
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Sprout className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
              Top Crop Recommendation
            </h2>
            <Link to="/crop-advisory" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="bg-gradient-to-r from-primary-50 to-green-50 dark:from-primary-900/30 dark:to-green-900/30 rounded-lg p-4 border border-primary-200 dark:border-primary-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{topRecommendation.cropName}</h3>
              <div className="bg-primary-600 dark:bg-primary-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                {topRecommendation.suitabilityScore}% Match
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-300">Expected Yield</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{topRecommendation.estimatedYield}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">Profit Potential</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{topRecommendation.profitPotential}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-gray-600 dark:text-gray-300 text-sm">Season</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{topRecommendation.season}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
              Upcoming Actions
            </h2>
            <Link to="/crop-advisory" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockSeasonalAdvisories.slice(0, 3).map((advisory) => (
              <div
                key={advisory.id}
                className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`badge ${
                          advisory.priority === 'high'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                            : advisory.priority === 'medium'
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {advisory.priority.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{advisory.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{new Date(advisory.actionDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Credit & Insurance Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Access financial services for your farm</p>
            <div className="flex gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Credit Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">745</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Max Loan Amount</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">₹5,00,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Interest Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">7.5%</p>
              </div>
            </div>
          </div>
          <Link
            to="/credit-insurance"
            className="btn-primary flex items-center"
          >
            Explore Options
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
