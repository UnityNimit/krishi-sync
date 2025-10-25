import { DashboardLayout } from '../components/layout'
import { MetricCard, ChartWrapper, TabPanel, Card, StatusBadge } from '../components/ui'
import { Sprout, TrendingUp, Droplet, AlertTriangle } from 'lucide-react'
import { farmerNavigation } from '../config/navigation'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const weatherData = [
  { day: 'Mon', temp: 28, humidity: 65 },
  { day: 'Tue', temp: 30, humidity: 70 },
  { day: 'Wed', temp: 29, humidity: 68 },
  { day: 'Thu', temp: 27, humidity: 72 },
  { day: 'Fri', temp: 26, humidity: 75 },
  { day: 'Sat', temp: 28, humidity: 70 },
  { day: 'Sun', temp: 29, humidity: 68 }
]

const farmerDashboardConfig = {
  appName: 'Farmer Portal',
  logo: <Sprout className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
  navigation: farmerNavigation,
  showTopbar: true,
  showSidebar: true,
  sidebarCollapsible: true
}

export function FarmerDashboardExample() {
  return (
    <DashboardLayout config={farmerDashboardConfig}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, Farmer!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Here's what's happening with your crops today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Active Crops"
            value="5"
            subtitle="Growing this season"
            icon={Sprout}
            variant="success"
          />
          <MetricCard
            title="Soil Moisture"
            value="68%"
            subtitle="Optimal range"
            icon={Droplet}
            variant="info"
            trend={{ direction: 'up', value: '+5%' }}
          />
          <MetricCard
            title="Expected Yield"
            value="12 tons"
            subtitle="This harvest"
            icon={TrendingUp}
            variant="primary"
            trend={{ direction: 'up', value: '+8%' }}
          />
          <MetricCard
            title="Active Alerts"
            value="2"
            subtitle="Requires attention"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWrapper
            title="Weather Forecast"
            description="Temperature and humidity for the next 7 days"
            icon={Droplet}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weatherData}>
                <CartesianGrid strokeDasharray="3 3" className="dark:opacity-30" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Temperature (°C)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>

          <Card>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
              Recent Alerts
            </h3>
            <div className="space-y-3">
              <div className="p-3 border border-amber-200 dark:border-amber-800 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                <div className="flex items-start justify-between">
                  <div>
                    <StatusBadge variant="warning" size="sm">High Priority</StatusBadge>
                    <h4 className="font-semibold text-gray-900 dark:text-white mt-2">
                      Pest Risk Detected
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      High risk of aphid infestation in tomato field. Apply recommended pesticide.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-start justify-between">
                  <div>
                    <StatusBadge variant="info" size="sm">Medium Priority</StatusBadge>
                    <h4 className="font-semibold text-gray-900 dark:text-white mt-2">
                      Irrigation Reminder
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Soil moisture dropping. Schedule irrigation for wheat field.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <TabPanel
          tabs={[
            {
              id: 'crops',
              label: 'My Crops',
              content: (
                <Card>
                  <div className="space-y-4">
                    {['Wheat', 'Rice', 'Tomato', 'Cotton', 'Sugarcane'].map((crop, idx) => (
                      <div key={crop} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-4">
                          <Sprout className="h-8 w-8 text-green-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{crop}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Field {idx + 1} • 2.5 acres</p>
                          </div>
                        </div>
                        <StatusBadge variant="success">Growing</StatusBadge>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            },
            {
              id: 'recommendations',
              label: 'Recommendations',
              content: (
                <Card>
                  <p className="text-gray-600 dark:text-gray-400">
                    Based on your soil type and current season, we recommend planting pulses 
                    in the next season for better yield and soil health.
                  </p>
                  <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Top Recommendation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Moong Dal - 95% suitability score
                    </p>
                  </div>
                </Card>
              )
            },
            {
              id: 'market',
              label: 'Market Prices',
              content: (
                <Card>
                  <p className="text-gray-600 dark:text-gray-400">
                    Current market prices for your crops in nearby mandis.
                  </p>
                  <div className="mt-4 space-y-2">
                    {[
                      { crop: 'Wheat', price: '₹2,150/quintal', change: '+5%' },
                      { crop: 'Rice', price: '₹3,200/quintal', change: '+2%' },
                      { crop: 'Cotton', price: '₹8,500/quintal', change: '-3%' }
                    ].map((item) => (
                      <div key={item.crop} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="font-medium text-gray-900 dark:text-white">{item.crop}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600 dark:text-gray-400">{item.price}</span>
                          <StatusBadge variant={item.change.startsWith('+') ? 'success' : 'danger'} size="sm">
                            {item.change}
                          </StatusBadge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            }
          ]}
          variant="line"
        />
      </div>
    </DashboardLayout>
  )
}

export default FarmerDashboardExample
