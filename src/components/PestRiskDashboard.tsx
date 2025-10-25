import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Bug, AlertTriangle, Shield, MapPin } from 'lucide-react'
import { RegionalPestRisk } from '../data/priceHistoryData'

interface PestRiskDashboardProps {
  regionalRisks: RegionalPestRisk[]
}

function PestRiskDashboard({ regionalRisks }: PestRiskDashboardProps) {
  const chartData = regionalRisks.map(risk => ({
    region: `${risk.region}\n(${risk.state})`,
    riskScore: risk.overallRiskScore,
    shortName: risk.state
  }))
  
  const getColorForScore = (score: number) => {
    if (score >= 70) return '#ef4444' // red
    if (score >= 60) return '#f59e0b' // amber
    return '#10b981' // green
  }
  
  const getSeverityColor = (severity: 'low' | 'moderate' | 'high' | 'critical') => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white'
      case 'high': return 'bg-red-100 text-red-800'
      case 'moderate': return 'bg-amber-100 text-amber-800'
      case 'low': return 'bg-green-100 text-green-800'
    }
  }
  
  const highRiskRegions = regionalRisks.filter(r => r.overallRiskScore >= 65)
  const criticalPests = regionalRisks.flatMap(r => 
    r.pests.filter(p => p.severity === 'high' || p.severity === 'critical')
  )
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Bug className="h-5 w-5 text-red-600" />
          Regional Pest Risk Analysis
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          AI-powered pest outbreak prediction and risk assessment by region
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700">High Risk Regions</p>
              <p className="text-3xl font-bold text-red-900 mt-2">
                {highRiskRegions.length}
              </p>
            </div>
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <p className="text-xs text-red-600 mt-2">Immediate intervention needed</p>
        </div>
        
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-700">Critical Pest Threats</p>
              <p className="text-3xl font-bold text-amber-900 mt-2">
                {criticalPests.length}
              </p>
            </div>
            <Bug className="h-10 w-10 text-amber-600" />
          </div>
          <p className="text-xs text-amber-600 mt-2">Active monitoring required</p>
        </div>
        
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Regions Monitored</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {regionalRisks.length}
              </p>
            </div>
            <Shield className="h-10 w-10 text-blue-600" />
          </div>
          <p className="text-xs text-blue-600 mt-2">Real-time surveillance active</p>
        </div>
      </div>
      
      <div className="card">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Regional Risk Scores</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                style={{ fontSize: '12px' }}
                stroke="#6b7280"
                label={{ value: 'Risk Score', position: 'insideBottom', offset: -5, style: { fontSize: '12px' } }}
              />
              <YAxis 
                type="category"
                dataKey="shortName" 
                style={{ fontSize: '12px' }}
                stroke="#6b7280"
                width={100}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => [value, 'Risk Score']}
              />
              <Bar dataKey="riskScore" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColorForScore(entry.riskScore)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {regionalRisks.map((risk) => (
          <div key={risk.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <h4 className="text-base font-semibold text-gray-900">
                    {risk.region} • {risk.state}
                  </h4>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Updated {new Date(risk.lastUpdated).toLocaleDateString()}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                risk.overallRiskScore >= 70 
                  ? 'bg-red-100 text-red-800' 
                  : risk.overallRiskScore >= 60
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {risk.overallRiskScore}
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Pest Threats
              </p>
              {risk.pests.map((pest, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Bug className="h-4 w-4 text-gray-600" />
                      <h5 className="text-sm font-semibold text-gray-900">{pest.name}</h5>
                    </div>
                    <p className="text-xs text-gray-600">
                      Affects: {pest.affectedCrops.join(', ')}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`badge ${getSeverityColor(pest.severity)}`}>
                      {pest.severity.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-gray-700">
                      {pest.riskScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {risk.recommendations.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-blue-900 mb-2">
                  Recommended Actions
                </p>
                <ul className="space-y-1">
                  {risk.recommendations.map((rec, index) => (
                    <li key={index} className="text-xs text-blue-800 flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {highRiskRegions.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 p-5 rounded-r-lg">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-base font-bold text-red-900 mb-2">
                Urgent Policy Action Required
              </h4>
              <p className="text-sm text-red-800 mb-3">
                {highRiskRegions.length} region{highRiskRegions.length > 1 ? 's' : ''} with 
                high pest risk scores (≥65) require immediate intervention to prevent crop losses.
              </p>
              <div className="bg-white/60 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-red-900">Recommended Policy Measures:</p>
                <ul className="space-y-1 text-xs text-red-800">
                  <li>• Deploy emergency pest control units to affected regions</li>
                  <li>• Subsidize pesticides and biological control agents</li>
                  <li>• Activate early warning systems for neighboring states</li>
                  <li>• Coordinate with agricultural universities for technical support</li>
                  <li>• Establish rapid response teams for outbreak management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PestRiskDashboard
