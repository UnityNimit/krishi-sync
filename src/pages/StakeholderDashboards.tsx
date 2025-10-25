import { useState } from 'react'
import {
  Users,
  Tractor,
  Package,
  Factory,
  ShoppingCart,
  ClipboardCheck,
  MessageCircle,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  AlertTriangle,
  CloudRain,
  Map,
  Brain,
  TrendingUp
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { stakeholderDashboards } from '../data/stakeholderData'
import { logisticsGeoData } from '../data/logisticsGeoData'
import { cropPriceHistories, demandSupplyAnalytics, cropPlanningSuggestions, regionalPestRisks } from '../data/priceHistoryData'
import { useWeatherData } from '../hooks/useWeatherData'
import { formatRelativeTime, weatherSeverityStyles } from '../utils/weatherStyles'
import LogisticsMap from '../components/LogisticsMap'
import PriceForecastChart from '../components/PriceForecastChart'
import DemandSupplyChart from '../components/DemandSupplyChart'
import CropPlanningSuggestions from '../components/CropPlanningSuggestions'
import PestRiskDashboard from '../components/PestRiskDashboard'
import type {
  CommunicationStatus,
  LogisticsStatus,
  OpportunityStatus,
  StakeholderRole,
  TrendDirection
} from '../types'

const roleTabs: Array<{ id: StakeholderRole; label: string; description: string; icon: LucideIcon }> = [
  {
    id: 'farmer',
    label: 'Farmer',
    description: 'Field operations, harvest readiness, on-ground execution',
    icon: Tractor
  },
  {
    id: 'fpo',
    label: 'FPO',
    description: 'Aggregation, quality control, cooperative commitments',
    icon: Package
  },
  {
    id: 'processor',
    label: 'Processor',
    description: 'Throughput, batch quality, downstream contracts',
    icon: Factory
  },
  {
    id: 'retailer',
    label: 'Retailer',
    description: 'Store availability, promotions, consumer demand',
    icon: ShoppingCart
  },
  {
    id: 'policymaker',
    label: 'Policymaker',
    description: 'AI insights, market analytics, strategic planning',
    icon: Brain
  }
]

const trendStyles: Record<TrendDirection, { icon: LucideIcon; classes: string }> = {
  positive: { icon: ArrowUpRight, classes: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100' },
  negative: { icon: ArrowDownRight, classes: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100' },
  neutral: { icon: Minus, classes: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' }
}

const communicationStatusClasses: Record<CommunicationStatus, string> = {
  'awaiting-response': 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100',
  scheduled: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100',
  resolved: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
}

const communicationStatusLabels: Record<CommunicationStatus, string> = {
  'awaiting-response': 'Awaiting Response',
  scheduled: 'Scheduled',
  resolved: 'Resolved'
}

const opportunityStatusClasses: Record<OpportunityStatus, string> = {
  negotiation: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100',
  matched: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
  new: 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100'
}

const opportunityStatusLabels: Record<OpportunityStatus, string> = {
  negotiation: 'In Negotiation',
  matched: 'Matched',
  new: 'New Lead'
}

const logisticsStatusClasses: Record<LogisticsStatus, string> = {
  'in-transit': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100',
  scheduled: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  delayed: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100',
  delivered: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
}

const logisticsStatusLabels: Record<LogisticsStatus, string> = {
  'in-transit': 'In Transit',
  scheduled: 'Scheduled',
  delayed: 'Delayed',
  delivered: 'Delivered'
}

const progressBarColor = (status: LogisticsStatus) => {
  if (status === 'delayed') return 'bg-red-500 dark:bg-red-600'
  if (status === 'delivered') return 'bg-green-600 dark:bg-green-700'
  return 'bg-primary-600 dark:bg-primary-500'
}

function StakeholderDashboards() {
  const [activeRole, setActiveRole] = useState<StakeholderRole>('farmer')
  const dashboard = stakeholderDashboards[activeRole]
  const activeRoleMeta = roleTabs.find((role) => role.id === activeRole)
  const { data: weatherData } = useWeatherData({ disableAutoRefresh: true })
  const logisticsWeatherAlerts = (weatherData?.alerts ?? []).filter((alert) => alert.category === 'logistics' || alert.category === 'general')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <Users className="h-8 w-8 mr-3 text-primary-600 dark:text-primary-400" />
          Stakeholder Dashboards
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
          Craft the demo narrative by moving between farmer, FPO, processor, and retailer vantage points.
          Each view reuses the shared dashboard shell to spotlight the KPIs, recommended actions, and
          communication threads that matter most for that stakeholder.
        </p>
      </div>

      <div className="card">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Select stakeholder role</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {roleTabs.map((role) => {
            const RoleIcon = role.icon
            const isActive = role.id === activeRole

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setActiveRole(role.id)}
                className={`w-full text-left rounded-xl border px-5 py-4 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 ${
                  isActive
                    ? 'border-primary-600 bg-primary-600 dark:bg-primary-700 text-white shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700'
                }`}
              >
                <RoleIcon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-primary-600 dark:text-primary-400'}`} />
                <p className="mt-3 text-lg font-semibold">{role.label}</p>
                <p className={`text-sm mt-1 ${isActive ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'}`}>{role.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="card bg-gradient-to-r from-primary-50 via-emerald-50 to-green-50 dark:from-primary-900/30 dark:via-emerald-900/30 dark:to-green-900/30 border-primary-200 dark:border-primary-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wide">
              {activeRoleMeta?.label} narrative focus
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{dashboard.highlight.title}</h2>
            <p className="text-lg font-semibold text-primary-700 dark:text-primary-300 mt-4">
              {dashboard.highlight.subtitle}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 max-w-2xl">{dashboard.highlight.context}</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 border border-primary-200 dark:border-primary-600 rounded-xl p-5 shadow-sm w-full lg:w-auto lg:min-w-[280px]">
            <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">Demo talking points</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Reinforce value delivered to this stakeholder.</li>
              <li>• Transition smoothly into marketplace or logistics story.</li>
              <li>• Highlight next action the team can take immediately.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {dashboard.kpis.map((kpi) => {
          const trend = trendStyles[kpi.trend]
          const TrendIcon = trend.icon

          return (
            <div key={kpi.id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{kpi.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-3">{kpi.value}</p>
                </div>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${trend.classes}`}>
                  <TrendIcon className="h-4 w-4 mr-1" />
                  <span>{kpi.change}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {activeRole === 'policymaker' ? (
        <>
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
              AI-Powered Price Forecasting
            </h2>
            <div className="space-y-8">
              {cropPriceHistories.slice(0, 3).map(crop => (
                <PriceForecastChart key={crop.crop} cropName={crop.crop} />
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
              Demand-Supply Analytics
            </h2>
            <div className="space-y-8">
              {demandSupplyAnalytics.slice(0, 3).map(data => (
                <DemandSupplyChart key={data.crop} data={data} />
              ))}
            </div>
          </div>

          <div className="card">
            <CropPlanningSuggestions suggestions={cropPlanningSuggestions} />
          </div>

          <div className="card">
            <PestRiskDashboard regionalRisks={regionalPestRisks} />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <ClipboardCheck className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
              Recommended Actions
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{dashboard.actions.length} prioritized items</span>
          </div>
          <div className="space-y-4">
            {dashboard.actions.map((action) => (
              <div key={action.id} className="relative border border-gray-200 dark:border-gray-700 rounded-lg p-5 pl-6 hover:border-primary-300 dark:hover:border-primary-600 transition">
                <span
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${
                    action.impact === 'high'
                      ? 'bg-red-500 dark:bg-red-600'
                      : action.impact === 'medium'
                      ? 'bg-amber-500 dark:bg-amber-600'
                      : 'bg-blue-500 dark:bg-blue-600'
                  }`}
                />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{action.owner}</p>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{action.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{action.description}</p>
                  </div>
                  <span
                    className={`badge ${
                      action.impact === 'high'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                        : action.impact === 'medium'
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    }`}
                  >
                    {action.impact.toUpperCase()} IMPACT
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Due {action.dueDate}</span>
                  <span>Owner: {action.owner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
              Communication Threads
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">Stay ahead of stakeholder conversations</span>
          </div>
          <div className="space-y-4">
            {dashboard.communications.map((thread) => (
              <div key={thread.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary-300 dark:hover:border-primary-600 transition">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{thread.topic}</p>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{thread.counterpart}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 italic">“{thread.lastMessage}”</p>
                  </div>
                  <span className={`badge ${communicationStatusClasses[thread.status]}`}>
                    {communicationStatusLabels[thread.status]}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Last updated {thread.lastUpdated}</span>
                  <span className="font-medium text-primary-600 dark:text-primary-400">View thread →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
            Marketplace & Logistics Snapshot
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">Bridge supply assurance with fulfillment confidence</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2 text-primary-600 dark:text-primary-400" />
              Active opportunities
            </h3>
            <div className="mt-3 space-y-4">
              {dashboard.opportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 hover:border-primary-300 dark:hover:border-primary-600 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{opportunity.buyer}</p>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{opportunity.requirement}</h4>
                    </div>
                    <span className={`badge ${opportunityStatusClasses[opportunity.status]}`}>
                      {opportunityStatusLabels[opportunity.status]}
                    </span>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <p>Value: <span className="font-semibold text-gray-900 dark:text-white">{opportunity.value}</span></p>
                    <p>Timeline: {opportunity.timeline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center">
              <Truck className="h-4 w-4 mr-2 text-primary-600 dark:text-primary-400" />
              Logistics movements
            </h3>
            <div className="mt-3 space-y-4">
              {dashboard.logistics.map((shipment) => (
                <div key={shipment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary-300 dark:hover:border-primary-600 transition">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{shipment.mode}</p>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{shipment.route}</h4>
                    </div>
                    <span className={`badge ${logisticsStatusClasses[shipment.status]}`}>
                      {logisticsStatusLabels[shipment.status]}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>{shipment.eta}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{shipment.progress}%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${progressBarColor(shipment.status)} h-2 rounded-full transition-all`}
                      style={{ width: `${shipment.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {logisticsWeatherAlerts.length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    Weather-driven logistics alerts
                  </h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {weatherData ? `Updated ${formatRelativeTime(weatherData.lastUpdated)}` : ''}
                  </p>
                </div>
                {logisticsWeatherAlerts.map((alert) => {
                  const badgeClass = weatherSeverityStyles[alert.severity]?.badge ?? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  const borderClass = weatherSeverityStyles[alert.severity]?.borderAccent ?? 'border-gray-300 dark:border-gray-600'
                  const textClass = weatherSeverityStyles[alert.severity]?.text ?? 'text-gray-900 dark:text-white'
                  const iconClass = weatherSeverityStyles[alert.severity]?.icon ?? 'text-gray-500 dark:text-gray-400'

                  return (
                    <div key={alert.id} className={`rounded-lg bg-white/90 dark:bg-gray-800/90 p-4 shadow-sm border-l-4 ${borderClass}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className={`badge ${badgeClass}`}>{alert.severity.toUpperCase()}</span>
                          <h5 className={`mt-2 text-base font-semibold ${textClass}`}>{alert.title}</h5>
                          <p className="mt-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Logistics intelligence</p>
                        </div>
                        <AlertTriangle className={`h-5 w-5 ${iconClass}`} />
                      </div>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{alert.description}</p>
                      {alert.impactAreas.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {alert.impactAreas.map((area) => (
                            <span key={area} className="badge bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                              {area}
                            </span>
                          ))}
                        </div>
                      )}
                      {alert.recommendedActions.length > 0 && (
                        <ul className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                          {alert.recommendedActions.map((action) => (
                            <li key={action}>{action}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Map className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
            Warehouse & Logistics Visibility Map
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">Interactive geospatial view of supply chain infrastructure</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Track warehouses, processing facilities, and active transport routes in real-time. 
          Use filters to focus on specific commodities or operational statuses.
        </p>
        <LogisticsMap 
          warehouses={logisticsGeoData.warehouses}
          processingUnits={logisticsGeoData.processingUnits}
          routes={logisticsGeoData.routes}
          className="h-[600px]"
        />
      </div>
        </>
      )}
    </div>
  )
}

export default StakeholderDashboards
