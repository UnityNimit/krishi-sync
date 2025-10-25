/**
 * Dynamic crop recommendation generator with ML-like predictions
 */

import { CropRecommendation } from '../types'

interface CropTemplate {
  cropName: string
  baseScore: number
  yieldOptions: string[]
  waterLevels: string[]
  profitRanges: [number, number] // Min and max profit in $/ha
  seasons: string[]
  reasonTemplates: string[][]
}

const cropTemplates: CropTemplate[] = [
  {
    cropName: 'Wheat',
    baseScore: 92,
    yieldOptions: ['4.2 tons/hectare', '4.5 tons/hectare', '4.8 tons/hectare', '5.0 tons/hectare'],
    waterLevels: ['Medium', 'Medium-High'],
    profitRanges: [1100, 1600],
    seasons: ['Rabi (Winter)', 'Rabi Season'],
    reasonTemplates: [
      [
        'Soil composition is ideal with pH {ph}',
        'Soil pH of {ph} is optimal for wheat cultivation',
        'Your soil pH ({ph}) perfectly suits wheat requirements'
      ],
      [
        'Historical yields in your region are {percentage}% above average',
        'Regional yield data shows {percentage}% higher productivity',
        'Your area has demonstrated {percentage}% better yields historically'
      ],
      [
        'Current market prices are favorable at ₹{price}/quintal',
        'Market analysis shows strong prices: ₹{price}/quintal',
        'Wheat trading at ₹{price}/quintal in nearby mandis'
      ],
      [
        'Weather forecast predicts optimal conditions for next {days} days',
        '{days}-day forecast shows ideal growing conditions',
        'Meteorological data indicates perfect weather for next {days} days'
      ]
    ]
  },
  {
    cropName: 'Chickpea',
    baseScore: 88,
    yieldOptions: ['2.0 tons/hectare', '2.2 tons/hectare', '2.4 tons/hectare', '2.6 tons/hectare'],
    waterLevels: ['Low', 'Low-Medium'],
    profitRanges: [850, 1200],
    seasons: ['Rabi (Winter)', 'Rabi Season'],
    reasonTemplates: [
      [
        'Low water requirement suits current groundwater levels at {depth}m',
        'Groundwater at {depth}m depth is adequate for chickpea',
        'Water table depth ({depth}m) is optimal for drought-resistant cultivation'
      ],
      [
        'Nitrogen-fixing properties will improve soil health by {percentage}%',
        'Expected soil nitrogen enhancement: {percentage}%',
        'Biological nitrogen fixation will boost soil fertility {percentage}%'
      ],
      [
        'Growing demand in export markets - {export} tons projected',
        'Export opportunities: {export} tons annual demand',
        'International market demand at {export} tons and increasing'
      ],
      [
        'Drought-resistant variety {variety} recommended for your area',
        '{variety} cultivar shows excellent performance in your region',
        'Recommended variety: {variety} with proven drought tolerance'
      ]
    ]
  },
  {
    cropName: 'Mustard',
    baseScore: 85,
    yieldOptions: ['1.6 tons/hectare', '1.8 tons/hectare', '2.0 tons/hectare', '2.2 tons/hectare'],
    waterLevels: ['Low', 'Low-Medium'],
    profitRanges: [750, 1100],
    seasons: ['Rabi (Winter)', 'Rabi Season'],
    reasonTemplates: [
      [
        'Short growing season ({days} days) allows quick returns',
        'Harvest in just {days} days from sowing',
        'Rapid crop cycle: {days} days to maturity'
      ],
      [
        'Good for crop rotation with cereals - {percentage}% yield boost',
        'Rotation benefits: {percentage}% improved subsequent crop yield',
        'Enhances soil structure for next crop by {percentage}%'
      ],
      [
        'Resistant to common pests: {pest1} and {pest2}',
        'Natural resistance to {pest1} and {pest2} infestations',
        'Low pest pressure: resistant to {pest1}, {pest2}'
      ],
      [
        'Oil extraction market is stable at ₹{price}/liter',
        'Mustard oil prices steady: ₹{price}/liter',
        'Current oil market: ₹{price}/liter with {trend} trend'
      ]
    ]
  },
  {
    cropName: 'Soybean',
    baseScore: 86,
    yieldOptions: ['2.8 tons/hectare', '3.0 tons/hectare', '3.2 tons/hectare', '3.5 tons/hectare'],
    waterLevels: ['Medium', 'Medium-High'],
    profitRanges: [900, 1400],
    seasons: ['Kharif (Monsoon)', 'Kharif Season'],
    reasonTemplates: [
      [
        'Monsoon forecast predicts {rainfall}mm rainfall - ideal for soybean',
        'Expected rainfall ({rainfall}mm) perfectly suits soybean needs',
        'IMD forecast: {rainfall}mm rainfall optimal for cultivation'
      ],
      [
        'High protein content ({protein}%) ensures premium prices',
        'Protein levels of {protein}% attract better market rates',
        '{protein}% protein content commands premium pricing'
      ],
      [
        'Industrial demand growing at {growth}% annually',
        'Market expanding: {growth}% year-on-year growth',
        'Projected demand increase: {growth}% per annum'
      ],
      [
        'Your soil type has shown {percentage}% better soybean yields',
        'Historical data: {percentage}% above-average productivity',
        'Regional success rate: {percentage}% higher yields recorded'
      ]
    ]
  },
  {
    cropName: 'Sunflower',
    baseScore: 83,
    yieldOptions: ['2.2 tons/hectare', '2.4 tons/hectare', '2.6 tons/hectare', '2.8 tons/hectare'],
    waterLevels: ['Medium', 'Medium-Low'],
    profitRanges: [850, 1300],
    seasons: ['Kharif (Monsoon)', 'Rabi (Winter)', 'Both Seasons'],
    reasonTemplates: [
      [
        'Dual-season flexibility allows {crops} crops per year',
        'Versatile timing: cultivate in {crops} seasons annually',
        'Multiple cropping possible: {crops} harvests per year'
      ],
      [
        'Oil content {percentage}% suitable for premium market',
        'High oil extraction rate: {percentage}%',
        'Quality oil content ({percentage}%) ensures better prices'
      ],
      [
        'Short duration variety ({days} days) reduces risk exposure',
        'Quick maturity: {days} days from sowing to harvest',
        'Fast-growing {days}-day variety recommended'
      ],
      [
        'Honeybee-friendly crop can generate additional ₹{income}/ha from pollination',
        'Apiculture synergy: extra ₹{income}/ha income potential',
        'Beekeeping integration possible: ₹{income}/ha additional revenue'
      ]
    ]
  },
  {
    cropName: 'Groundnut',
    baseScore: 87,
    yieldOptions: ['3.0 tons/hectare', '3.2 tons/hectare', '3.5 tons/hectare', '3.8 tons/hectare'],
    waterLevels: ['Medium', 'Medium-Low'],
    profitRanges: [1000, 1500],
    seasons: ['Kharif (Monsoon)', 'Summer Season'],
    reasonTemplates: [
      [
        'Sandy loam soil texture with {percentage}% sand is ideal',
        'Soil composition ({percentage}% sand) perfect for pod development',
        'Optimal sand content: {percentage}% in your soil'
      ],
      [
        'Value-added products market worth ₹{value} crores',
        'Processing industry demand: ₹{value} crores annually',
        'Post-harvest value chain: ₹{value} crores market size'
      ],
      [
        'Disease-resistant variety {variety} available',
        '{variety} cultivar with excellent disease tolerance',
        'Recommended hybrid: {variety} (disease-resistant)'
      ],
      [
        'Export potential to {country} - {quantity} tons annual demand',
        'International market: {country} importing {quantity} tons',
        '{country} market opportunity: {quantity} tons demand'
      ]
    ]
  }
]

/**
 * Generate variables for reason templates
 */
function generateReasonVariables(): Record<string, string | number> {
  const variables: Record<string, string | number> = {
    ph: (6.0 + Math.random() * 2.0).toFixed(1), // 6.0-8.0
    percentage: Math.round(10 + Math.random() * 20), // 10-30%
    price: Math.round(2000 + Math.random() * 1000), // 2000-3000
    days: Math.round(90 + Math.random() * 40), // 90-130
    depth: Math.round(8 + Math.random() * 12), // 8-20m
    export: Math.round(10000 + Math.random() * 20000), // 10k-30k tons
    variety: ['Pusa-362', 'JG-11', 'BG-372', 'ICCC-37', 'PDM-11'][Math.floor(Math.random() * 5)],
    pest1: ['Aphids', 'Pod borers', 'Leaf miners'][Math.floor(Math.random() * 3)],
    pest2: ['White flies', 'Stem borers', 'Thrips'][Math.floor(Math.random() * 3)],
    trend: ['upward', 'stable', 'positive'][Math.floor(Math.random() * 3)],
    rainfall: Math.round(600 + Math.random() * 400), // 600-1000mm
    protein: Math.round(36 + Math.random() * 6), // 36-42%
    growth: Math.round(8 + Math.random() * 12), // 8-20%
    crops: Math.floor(2 + Math.random() * 2), // 2-3
    income: Math.round(5000 + Math.random() * 10000), // 5k-15k
    value: Math.round(5000 + Math.random() * 10000), // 5k-15k crores
    country: ['UAE', 'Malaysia', 'Singapore', 'USA'][Math.floor(Math.random() * 4)],
    quantity: Math.round(50000 + Math.random() * 100000) // 50k-150k tons
  }
  
  return variables
}

/**
 * Fill template with variables
 */
function fillTemplate(template: string, variables: Record<string, string | number>): string {
  let filled = template
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`\\{${key}\\}`, 'g')
    filled = filled.replace(regex, String(variables[key]))
  })
  return filled
}

/**
 * Generate dynamic crop recommendations
 */
export function generateDynamicCropRecommendations(): CropRecommendation[] {
  // Randomly select 3-4 crops
  const numCrops = 3 + Math.floor(Math.random() * 2) // 3-4 crops
  const selectedTemplates = [...cropTemplates]
    .sort(() => Math.random() - 0.5)
    .slice(0, numCrops)
  
  return selectedTemplates.map((template, index) => {
    // Generate variations
    const scoreVariation = Math.round((Math.random() - 0.5) * 10) // ±5 points
    const suitabilityScore = Math.max(75, Math.min(98, template.baseScore + scoreVariation))
    
    const estimatedYield = template.yieldOptions[Math.floor(Math.random() * template.yieldOptions.length)]
    const waterRequirement = template.waterLevels[Math.floor(Math.random() * template.waterLevels.length)]
    
    const [minProfit, maxProfit] = template.profitRanges
    const profitMin = minProfit + Math.round((Math.random() - 0.5) * 100)
    const profitMax = maxProfit + Math.round((Math.random() - 0.5) * 100)
    const profitPotential = `$${profitMin} - $${profitMax}/hectare`
    
    const season = template.seasons[Math.floor(Math.random() * template.seasons.length)]
    
    // Generate reasons
    const variables = generateReasonVariables()
    const reasons = template.reasonTemplates.map(templates => {
      const selectedTemplate = templates[Math.floor(Math.random() * templates.length)]
      return fillTemplate(selectedTemplate, variables)
    })
    
    return {
      id: `crop-${Date.now()}-${index}`,
      cropName: template.cropName,
      suitabilityScore,
      estimatedYield,
      waterRequirement,
      profitPotential,
      season,
      reasons
    }
  })
}
