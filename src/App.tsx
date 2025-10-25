import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sprout } from 'lucide-react'
import { DashboardLayout } from './components/layout'
import { defaultNavigation } from './config/navigation'
import { useNotification } from './hooks/useNotification'
import { NotificationContainer } from './components/ui/NotificationContainer'
import Dashboard from './pages/Dashboard'
import StakeholderDashboards from './pages/StakeholderDashboards'
import CropAdvisory from './pages/CropAdvisory'
import CreditInsurance from './pages/CreditInsurance'
import Marketplace from './pages/Marketplace'
import Traceability from './pages/Traceability'
import PolicymakerDashboard from './pages/PolicymakerDashboard'
import { NotificationContext } from './context/NotificationContext'

function AppContent() {
  const notificationHook = useNotification()

  const dashboardConfig = {
    appName: 'AgriAdvisory',
    logo: <Sprout className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
    navigation: defaultNavigation,
    showTopbar: true,
    showSidebar: false
  }

  return (
    <NotificationContext.Provider value={notificationHook}>
      <DashboardLayout config={dashboardConfig}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/stakeholders" element={<StakeholderDashboards />} />
          <Route path="/crop-advisory" element={<CropAdvisory />} />
          <Route path="/credit-insurance" element={<CreditInsurance />} />
          <Route path="/traceability" element={<Traceability />} />
          <Route path="/dashboard/policymaker" element={<PolicymakerDashboard />} />
        </Routes>
      </DashboardLayout>
      <NotificationContainer
        notifications={notificationHook.notifications}
        onDismiss={notificationHook.dismissNotification}
      />
    </NotificationContext.Provider>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
