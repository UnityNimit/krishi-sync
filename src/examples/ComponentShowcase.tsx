import { MetricCard, StatusBadge, Table, TabPanel, ChartWrapper, Card } from '../components/ui'
import { Users, TrendingUp, ShoppingCart, BarChart3 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const sampleData = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 600 },
  { month: 'Mar', value: 800 },
  { month: 'Apr', value: 700 },
  { month: 'May', value: 900 },
  { month: 'Jun', value: 1100 }
]

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Farmer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', role: 'Buyer' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'inactive', role: 'Farmer' }
]

export function ComponentShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Component Library Showcase</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Examples of all reusable dashboard components
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Metric Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Users"
            value="1,234"
            subtitle="Active users this month"
            icon={Users}
            variant="primary"
            trend={{ direction: 'up', value: '+12%' }}
          />
          <MetricCard
            title="Revenue"
            value="₹5,00,000"
            subtitle="Last 30 days"
            icon={TrendingUp}
            variant="success"
            trend={{ direction: 'up', value: '+8.5%' }}
          />
          <MetricCard
            title="Orders"
            value="156"
            subtitle="Pending fulfillment"
            icon={ShoppingCart}
            variant="warning"
            trend={{ direction: 'down', value: '-3%' }}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Status Badges</h2>
        <Card>
          <div className="flex flex-wrap gap-3">
            <StatusBadge variant="default">Default</StatusBadge>
            <StatusBadge variant="primary">Primary</StatusBadge>
            <StatusBadge variant="success">Success</StatusBadge>
            <StatusBadge variant="warning">Warning</StatusBadge>
            <StatusBadge variant="danger">Danger</StatusBadge>
            <StatusBadge variant="info">Info</StatusBadge>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <StatusBadge variant="primary" size="sm">Small</StatusBadge>
            <StatusBadge variant="primary" size="md">Medium</StatusBadge>
            <StatusBadge variant="primary" size="lg">Large</StatusBadge>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Chart Wrapper</h2>
        <ChartWrapper
          title="Monthly Trend"
          description="Sample data visualization"
          icon={BarChart3}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Table</h2>
        <Card padding="none">
          <Table
            data={users}
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'email', header: 'Email' },
              { key: 'role', header: 'Role' },
              {
                key: 'status',
                header: 'Status',
                render: (row) => (
                  <StatusBadge variant={row.status === 'active' ? 'success' : 'neutral'}>
                    {row.status}
                  </StatusBadge>
                )
              }
            ]}
            keyExtractor={(row) => row.id}
            striped
            hoverable
          />
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tab Panel</h2>
        <TabPanel
          tabs={[
            {
              id: 'overview',
              label: 'Overview',
              content: (
                <Card>
                  <p className="text-gray-600 dark:text-gray-400">
                    This is the overview tab content. You can put any component here.
                  </p>
                </Card>
              )
            },
            {
              id: 'details',
              label: 'Details',
              content: (
                <Card>
                  <p className="text-gray-600 dark:text-gray-400">
                    This is the details tab content with more specific information.
                  </p>
                </Card>
              )
            },
            {
              id: 'analytics',
              label: 'Analytics',
              icon: <BarChart3 className="h-4 w-4" />,
              content: (
                <Card>
                  <p className="text-gray-600 dark:text-gray-400">
                    Analytics and insights would go here.
                  </p>
                </Card>
              )
            }
          ]}
          variant="line"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pills Variant Tabs</h2>
        <TabPanel
          tabs={[
            {
              id: 'all',
              label: 'All',
              content: <Card><p className="text-gray-600 dark:text-gray-400">All items</p></Card>
            },
            {
              id: 'active',
              label: 'Active',
              content: <Card><p className="text-gray-600 dark:text-gray-400">Active items only</p></Card>
            },
            {
              id: 'archived',
              label: 'Archived',
              content: <Card><p className="text-gray-600 dark:text-gray-400">Archived items</p></Card>
            }
          ]}
          variant="pills"
        />
      </section>
    </div>
  )
}

export default ComponentShowcase
