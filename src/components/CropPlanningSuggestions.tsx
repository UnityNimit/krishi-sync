import { Sprout, MapPin, Target, Clock, Gift, TrendingUp } from 'lucide-react'
import { CropPlanningSuggestion } from '../data/priceHistoryData'

interface CropPlanningSuggestionsProps {
  suggestions: CropPlanningSuggestion[]
}

function CropPlanningSuggestions({ suggestions }: CropPlanningSuggestionsProps) {
  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300'
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-300'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300'
    }
  }
  
  const getPriorityBorder = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'border-l-red-600'
      case 'medium': return 'border-l-amber-600'
      case 'low': return 'border-l-blue-600'
    }
  }
  
  const highPriority = suggestions.filter(s => s.priority === 'high')
  const mediumPriority = suggestions.filter(s => s.priority === 'medium')
  const lowPriority = suggestions.filter(s => s.priority === 'low')
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Sprout className="h-5 w-5 text-green-600" />
          AI-Powered Crop Planning Suggestions
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Strategic recommendations based on demand-supply forecasts and market intelligence
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-medium text-red-700">High Priority Actions</p>
          <p className="text-3xl font-bold text-red-900 mt-2">{highPriority.length}</p>
          <p className="text-xs text-red-600 mt-1">Immediate policy intervention</p>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm font-medium text-amber-700">Medium Priority</p>
          <p className="text-3xl font-bold text-amber-900 mt-2">{mediumPriority.length}</p>
          <p className="text-xs text-amber-600 mt-1">Strategic planning required</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-700">Low Priority</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">{lowPriority.length}</p>
          <p className="text-xs text-blue-600 mt-1">Long-term considerations</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id} 
            className={`card border-l-4 ${getPriorityBorder(suggestion.priority)} hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="bg-green-100 text-green-700 rounded-lg p-2">
                  <Sprout className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{suggestion.crop}</h4>
                    <span className={`badge ${getPriorityColor(suggestion.priority)}`}>
                      {suggestion.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                  <p className="text-base font-semibold text-gray-800">
                    {suggestion.recommendation}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                  Rationale
                </p>
                <p className="text-sm text-gray-700">
                  {suggestion.rationale}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                  Expected Impact
                </p>
                <p className="text-sm text-gray-700">
                  {suggestion.expectedImpact}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-500">Target Regions</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {suggestion.targetRegions.map((region, index) => (
                      <span key={index} className="badge bg-gray-100 text-gray-700">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-500">Implementation Timeframe</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {suggestion.timeframe}
                  </p>
                </div>
              </div>
            </div>
            
            {suggestion.incentives.length > 0 && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="h-5 w-5 text-emerald-700" />
                  <p className="text-sm font-semibold text-emerald-900">
                    Recommended Policy Incentives
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestion.incentives.map((incentive, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-emerald-800">
                      <Target className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                      <span>{incentive}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {highPriority.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 border-2 border-red-300 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-600 text-white rounded-full p-3">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-red-900 mb-2">
                Immediate Action Required
              </h4>
              <p className="text-sm text-red-800 mb-4">
                {highPriority.length} high-priority crop planning recommendation{highPriority.length > 1 ? 's' : ''} 
                {' '}require immediate policy intervention to address market imbalances and ensure food security.
              </p>
              <div className="bg-white/70 rounded-lg p-4">
                <p className="text-xs font-semibold text-red-900 mb-2">Critical Crops Needing Attention:</p>
                <div className="flex flex-wrap gap-2">
                  {highPriority.map((item) => (
                    <span key={item.id} className="badge bg-red-100 text-red-800 border border-red-300">
                      {item.crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CropPlanningSuggestions
