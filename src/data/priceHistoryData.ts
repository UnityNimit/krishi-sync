// Mock price history data for various crops
export interface PriceHistoryEntry {
  date: string
  price: number
  volume: number
}

export interface CropPriceHistory {
  crop: string
  currency: string
  unit: string
  history: PriceHistoryEntry[]
}

// Generate price history for the last 12 months with realistic seasonal patterns
const generatePriceHistory = (
  crop: string,
  basePrice: number,
  seasonalPattern: number[],
  volatility: number
): CropPriceHistory => {
  const history: PriceHistoryEntry[] = []
  const now = new Date()
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now)
    date.setMonth(date.getMonth() - i)
    
    const monthIndex = date.getMonth()
    const seasonalFactor = seasonalPattern[monthIndex] || 1
    const randomFactor = 1 + (Math.random() - 0.5) * volatility
    const price = Math.round(basePrice * seasonalFactor * randomFactor)
    const volume = Math.round(5000 + Math.random() * 3000)
    
    history.push({
      date: date.toISOString().split('T')[0],
      price,
      volume
    })
  }
  
  return {
    crop,
    currency: 'INR',
    unit: 'per quintal',
    history
  }
}

// Seasonal patterns: 1.0 = base price, >1.0 = higher prices, <1.0 = lower prices
const wheatSeasonalPattern = [
  1.1, 1.15, 1.2, 1.15, 1.0, 0.9, // Jan-Jun (harvest season lowers prices)
  0.85, 0.9, 0.95, 1.0, 1.05, 1.1  // Jul-Dec (prices rise before new season)
]

const riceSeasonalPattern = [
  1.0, 0.95, 0.9, 0.9, 0.95, 1.0,  // Jan-Jun
  1.05, 1.1, 1.15, 1.2, 1.15, 1.05  // Jul-Dec (monsoon affects supply)
]

const maizeSeasonalPattern = [
  1.05, 1.1, 1.15, 1.1, 1.0, 0.95,  // Jan-Jun
  0.9, 0.9, 0.95, 1.0, 1.05, 1.05   // Jul-Dec
]

const chickpeasSeasonalPattern = [
  1.0, 1.05, 1.1, 1.15, 1.2, 1.15,  // Jan-Jun
  1.1, 1.05, 1.0, 0.95, 0.95, 1.0   // Jul-Dec
]

const mustardSeasonalPattern = [
  1.1, 1.15, 1.2, 1.15, 1.05, 0.95,  // Jan-Jun
  0.9, 0.85, 0.9, 0.95, 1.0, 1.05    // Jul-Dec
]

export const cropPriceHistories: CropPriceHistory[] = [
  generatePriceHistory('Wheat', 2200, wheatSeasonalPattern, 0.15),
  generatePriceHistory('Rice', 3000, riceSeasonalPattern, 0.12),
  generatePriceHistory('Maize', 1800, maizeSeasonalPattern, 0.18),
  generatePriceHistory('Chickpea', 5500, chickpeasSeasonalPattern, 0.2),
  generatePriceHistory('Mustard', 4800, mustardSeasonalPattern, 0.16)
]

// Demand-Supply data
export interface DemandSupplyData {
  crop: string
  currentDemand: number
  currentSupply: number
  demandTrend: 'increasing' | 'stable' | 'decreasing'
  supplyTrend: 'increasing' | 'stable' | 'decreasing'
  marketBalance: 'surplus' | 'balanced' | 'deficit'
  demandForecast: number[]
  supplyForecast: number[]
  months: string[]
}

export const demandSupplyAnalytics: DemandSupplyData[] = [
  {
    crop: 'Wheat',
    currentDemand: 95000,
    currentSupply: 98000,
    demandTrend: 'increasing',
    supplyTrend: 'stable',
    marketBalance: 'balanced',
    demandForecast: [95000, 96500, 98000, 99500, 101000, 102500],
    supplyForecast: [98000, 98500, 99000, 99500, 100000, 100500],
    months: ['Current', 'Month +1', 'Month +2', 'Month +3', 'Month +4', 'Month +5']
  },
  {
    crop: 'Rice',
    currentDemand: 120000,
    currentSupply: 115000,
    demandTrend: 'increasing',
    supplyTrend: 'decreasing',
    marketBalance: 'deficit',
    demandForecast: [120000, 122000, 124000, 126000, 128000, 130000],
    supplyForecast: [115000, 114000, 113500, 113000, 112500, 112000],
    months: ['Current', 'Month +1', 'Month +2', 'Month +3', 'Month +4', 'Month +5']
  },
  {
    crop: 'Maize',
    currentDemand: 75000,
    currentSupply: 85000,
    demandTrend: 'stable',
    supplyTrend: 'increasing',
    marketBalance: 'surplus',
    demandForecast: [75000, 75500, 76000, 76500, 77000, 77500],
    supplyForecast: [85000, 87000, 89000, 91000, 93000, 95000],
    months: ['Current', 'Month +1', 'Month +2', 'Month +3', 'Month +4', 'Month +5']
  },
  {
    crop: 'Chickpea',
    currentDemand: 45000,
    currentSupply: 42000,
    demandTrend: 'increasing',
    supplyTrend: 'stable',
    marketBalance: 'deficit',
    demandForecast: [45000, 46000, 47000, 48000, 49000, 50000],
    supplyForecast: [42000, 42500, 43000, 43500, 44000, 44500],
    months: ['Current', 'Month +1', 'Month +2', 'Month +3', 'Month +4', 'Month +5']
  },
  {
    crop: 'Mustard',
    currentDemand: 38000,
    currentSupply: 40000,
    demandTrend: 'stable',
    supplyTrend: 'stable',
    marketBalance: 'balanced',
    demandForecast: [38000, 38500, 39000, 39500, 40000, 40500],
    supplyForecast: [40000, 40500, 41000, 41500, 42000, 42500],
    months: ['Current', 'Month +1', 'Month +2', 'Month +3', 'Month +4', 'Month +5']
  }
]

// Crop planning suggestions for policymakers
export interface CropPlanningSuggestion {
  id: string
  crop: string
  recommendation: string
  rationale: string
  targetRegions: string[]
  expectedImpact: string
  priority: 'high' | 'medium' | 'low'
  timeframe: string
  incentives: string[]
}

export const cropPlanningSuggestions: CropPlanningSuggestion[] = [
  {
    id: 'cps-1',
    crop: 'Rice',
    recommendation: 'Increase rice production by 8-10% in next kharif season',
    rationale: 'Current deficit of 5,000 MT. Demand projected to increase by 8.3% over next 6 months while supply is declining.',
    targetRegions: ['Punjab', 'Haryana', 'Uttar Pradesh', 'West Bengal'],
    expectedImpact: 'Bridge supply gap, stabilize prices around ₹3,000-3,200 per quintal',
    priority: 'high',
    timeframe: 'Next 6 months',
    incentives: ['Subsidized seeds', 'Increased MSP', 'Irrigation support', 'Credit at 6% interest']
  },
  {
    id: 'cps-2',
    crop: 'Chickpea',
    recommendation: 'Encourage chickpea cultivation through enhanced procurement',
    rationale: 'Growing deficit of 3,000 MT. Export demand increasing. Current prices favorable for farmers.',
    targetRegions: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Karnataka'],
    expectedImpact: 'Reduce import dependency, ensure domestic price stability',
    priority: 'high',
    timeframe: 'Next rabi season (4-5 months)',
    incentives: ['Guaranteed procurement', 'Storage subsidies', 'Quality seed distribution']
  },
  {
    id: 'cps-3',
    crop: 'Maize',
    recommendation: 'Moderate maize production, focus on quality improvement',
    rationale: 'Current surplus of 10,000 MT. Supply growing faster than demand. Risk of price depression.',
    targetRegions: ['Karnataka', 'Bihar', 'Rajasthan'],
    expectedImpact: 'Prevent price crash, improve farmer margins through quality premium',
    priority: 'medium',
    timeframe: 'Next 3-4 months',
    incentives: ['Quality certification programs', 'Direct market linkages', 'Processing unit support']
  },
  {
    id: 'cps-4',
    crop: 'Wheat',
    recommendation: 'Maintain current wheat production levels with focus on efficiency',
    rationale: 'Market well-balanced with slight surplus. Demand growing at healthy pace.',
    targetRegions: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh'],
    expectedImpact: 'Stable prices, sustained farmer incomes',
    priority: 'medium',
    timeframe: 'Next rabi season',
    incentives: ['Input cost subsidies', 'Technology adoption support', 'Crop insurance']
  },
  {
    id: 'cps-5',
    crop: 'Mustard',
    recommendation: 'Steady-state approach with diversification support',
    rationale: 'Market balanced. Opportunity to diversify into value-added products.',
    targetRegions: ['Rajasthan', 'Haryana', 'Madhya Pradesh'],
    expectedImpact: 'Higher farmer returns through value addition',
    priority: 'low',
    timeframe: 'Next 6-8 months',
    incentives: ['Oil extraction unit support', 'Cooperative formation', 'Market development']
  }
]

// Regional pest risk scores
export interface RegionalPestRisk {
  id: string
  region: string
  state: string
  overallRiskScore: number
  pests: {
    name: string
    riskScore: number
    affectedCrops: string[]
    severity: 'low' | 'moderate' | 'high' | 'critical'
  }[]
  recommendations: string[]
  lastUpdated: string
}

export const regionalPestRisks: RegionalPestRisk[] = [
  {
    id: 'rpr-1',
    region: 'North-West',
    state: 'Punjab',
    overallRiskScore: 72,
    pests: [
      {
        name: 'Brown Planthopper',
        riskScore: 78,
        affectedCrops: ['Rice'],
        severity: 'high'
      },
      {
        name: 'Aphids',
        riskScore: 65,
        affectedCrops: ['Wheat', 'Mustard'],
        severity: 'moderate'
      },
      {
        name: 'Stem Borer',
        riskScore: 58,
        affectedCrops: ['Rice'],
        severity: 'moderate'
      }
    ],
    recommendations: [
      'Deploy prophylactic treatment in rice paddies',
      'Increase surveillance in wheat growing regions',
      'Distribute neem-based pesticides to farmers'
    ],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'rpr-2',
    region: 'Central',
    state: 'Madhya Pradesh',
    overallRiskScore: 64,
    pests: [
      {
        name: 'Pod Borer',
        riskScore: 82,
        affectedCrops: ['Chickpea'],
        severity: 'high'
      },
      {
        name: 'Whitefly',
        riskScore: 55,
        affectedCrops: ['Cotton'],
        severity: 'moderate'
      }
    ],
    recommendations: [
      'Early warning system activation for chickpea growers',
      'Distribute pheromone traps',
      'Training on integrated pest management'
    ],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'rpr-3',
    region: 'South',
    state: 'Karnataka',
    overallRiskScore: 58,
    pests: [
      {
        name: 'Fall Armyworm',
        riskScore: 68,
        affectedCrops: ['Maize'],
        severity: 'moderate'
      },
      {
        name: 'Blast Disease',
        riskScore: 52,
        affectedCrops: ['Rice'],
        severity: 'moderate'
      }
    ],
    recommendations: [
      'Monitor maize fields closely',
      'Promote biological control agents',
      'Weather-based advisory for fungal disease prevention'
    ],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'rpr-4',
    region: 'East',
    state: 'West Bengal',
    overallRiskScore: 69,
    pests: [
      {
        name: 'Yellow Stem Borer',
        riskScore: 75,
        affectedCrops: ['Rice'],
        severity: 'high'
      },
      {
        name: 'Gall Midge',
        riskScore: 62,
        affectedCrops: ['Rice'],
        severity: 'moderate'
      }
    ],
    recommendations: [
      'Urgent pest control measures in rice growing districts',
      'Subsidy on effective pesticides',
      'Community-based pest surveillance'
    ],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'rpr-5',
    region: 'West',
    state: 'Maharashtra',
    overallRiskScore: 55,
    pests: [
      {
        name: 'Pink Bollworm',
        riskScore: 60,
        affectedCrops: ['Cotton'],
        severity: 'moderate'
      },
      {
        name: 'Thrips',
        riskScore: 48,
        affectedCrops: ['Onion'],
        severity: 'low'
      }
    ],
    recommendations: [
      'Continue current monitoring protocols',
      'Promote Bt cotton adoption',
      'Strengthen extension services'
    ],
    lastUpdated: new Date().toISOString()
  }
]
