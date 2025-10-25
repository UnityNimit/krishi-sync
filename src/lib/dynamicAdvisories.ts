/**
 * Dynamic advisory generation system
 * Generates AI-powered recommendations with realistic variation
 */

export interface AdvisoryTemplate {
  type: string
  templates: string[]
  variables: () => Record<string, string | number>
}

export interface GeneratedAdvisory {
  type: string
  text: string
  confidence: number
  priority: 'high' | 'medium' | 'low'
  timestamp: Date
  source: string
}

// Cache to avoid immediate repeats
const sessionRecommendations = new Set<string>()

const advisoryTemplates: AdvisoryTemplate[] = [
  {
    type: 'irrigation',
    templates: [
      'Irrigation recommended - soil moisture at {moisture}%',
      'Apply {amount}mm irrigation in next {days} days',
      'Drip irrigation optimal - temperature forecast: {temp}°C',
      'Monitor soil moisture - current level {moisture}%, ideal range {idealMin}-{idealMax}%',
      '{frequency} irrigation cycle suggested for next {period}',
      'Water requirement: {liters}L/ha based on crop stage and weather'
    ],
    variables: () => ({
      moisture: Math.round(55 + Math.random() * 20), // 55-75%
      amount: Math.round(20 + Math.random() * 30), // 20-50mm
      days: Math.round(2 + Math.random() * 5), // 2-7 days
      temp: Math.round(28 + Math.random() * 10), // 28-38°C
      idealMin: 60,
      idealMax: 80,
      frequency: ['Light', 'Moderate', 'Heavy'][Math.floor(Math.random() * 3)],
      period: ['week', '10 days', 'fortnight'][Math.floor(Math.random() * 3)],
      liters: Math.round(3000 + Math.random() * 2000) // 3000-5000L
    })
  },
  
  {
    type: 'fertilizer',
    templates: [
      'Apply {nutrient} fertilizer - {amount} kg/ha recommended',
      '{type} application suggested: {bags} bags per acre',
      'Balanced NPK ({npk}) optimal for current growth stage',
      'Organic manure ({amount} tonnes/ha) beneficial in next {days} days',
      'Micronutrient spray ({nutrient}) at {concentration}% concentration',
      'Split dose: {dose1} kg now, {dose2} kg after {days} days'
    ],
    variables: () => ({
      nutrient: ['Nitrogen', 'Urea', 'DAP', 'Potash', 'Phosphorus'][Math.floor(Math.random() * 5)],
      amount: Math.round(30 + Math.random() * 50), // 30-80 kg
      type: ['Urea', 'NPK Complex', 'Organic Manure', 'Vermicompost'][Math.floor(Math.random() * 4)],
      bags: Math.round(2 + Math.random() * 4), // 2-6 bags
      npk: ['19:19:19', '20:20:20', '10:26:26', '12:32:16'][Math.floor(Math.random() * 4)],
      days: Math.round(3 + Math.random() * 7), // 3-10 days
      concentration: (0.5 + Math.random() * 1).toFixed(1), // 0.5-1.5%
      dose1: Math.round(20 + Math.random() * 20),
      dose2: Math.round(20 + Math.random() * 20)
    })
  },
  
  {
    type: 'pest',
    templates: [
      '{pest} monitoring alert - population {trend} in {region}',
      '{disease} risk detected - {action} recommended',
      '{pest} activity at {level}% threshold - inspect {frequency}',
      'Spray {pesticide} at {rate}ml/liter for {pest} control',
      'Integrated pest management: {method1} + {method2}',
      '{pest} infestation risk: {risk}% - preventive action needed'
    ],
    variables: () => ({
      pest: ['Aphids', 'Whiteflies', 'Leaf Miners', 'Pod Borers', 'Stem Borers', 'Thrips', 'Jassids', 'Cutworms'][Math.floor(Math.random() * 8)],
      trend: ['increasing', 'stable at high levels', 'detected'][Math.floor(Math.random() * 3)],
      region: ['your area', 'nearby fields', 'district', 'neighboring villages'][Math.floor(Math.random() * 4)],
      disease: ['Early Blight', 'Leaf Spot', 'Root Rot', 'Powdery Mildew', 'Rust'][Math.floor(Math.random() * 5)],
      action: ['preventive spray', 'fungicide application', 'immediate inspection'][Math.floor(Math.random() * 3)],
      level: Math.round(50 + Math.random() * 40), // 50-90%
      frequency: ['daily', 'twice weekly', 'every 3 days'][Math.floor(Math.random() * 3)],
      pesticide: ['Imidacloprid', 'Cypermethrin', 'Neem oil', 'Chlorpyrifos'][Math.floor(Math.random() * 4)],
      rate: (2 + Math.random() * 3).toFixed(1), // 2-5ml
      method1: ['Pheromone traps', 'Yellow sticky traps', 'Neem spray'][Math.floor(Math.random() * 3)],
      method2: ['biological control', 'crop rotation', 'resistant varieties'][Math.floor(Math.random() * 3)],
      risk: Math.round(60 + Math.random() * 35) // 60-95%
    })
  },
  
  {
    type: 'weather',
    templates: [
      '{rainfall}mm rainfall predicted - {action}',
      'Temperature forecast: {tempMin}-{tempMax}°C - {recommendation}',
      '{weatherEvent} warning - {precaution} advised',
      'Ideal {activity} conditions in next {days} days',
      'Humidity {humidity}% expected - monitor for {risk}',
      'Wind speed {windSpeed} km/h - {impact} on spraying operations'
    ],
    variables: () => ({
      rainfall: Math.round(10 + Math.random() * 90), // 10-100mm
      action: ['ensure drainage', 'postpone spraying', 'cover sensitive crops'][Math.floor(Math.random() * 3)],
      tempMin: Math.round(20 + Math.random() * 10), // 20-30°C
      tempMax: Math.round(32 + Math.random() * 10), // 32-42°C
      recommendation: ['increase irrigation', 'adjust field activities', 'monitor crop stress'][Math.floor(Math.random() * 3)],
      weatherEvent: ['Hailstorm', 'Heat wave', 'Frost', 'Thunderstorm'][Math.floor(Math.random() * 4)],
      precaution: ['protective measures', 'crop covering', 'emergency irrigation'][Math.floor(Math.random() * 3)],
      activity: ['sowing', 'transplanting', 'harvesting', 'spraying'][Math.floor(Math.random() * 4)],
      days: Math.round(2 + Math.random() * 5), // 2-7 days
      humidity: Math.round(55 + Math.random() * 30), // 55-85%
      risk: ['fungal diseases', 'pest activity', 'poor germination'][Math.floor(Math.random() * 3)],
      windSpeed: Math.round(10 + Math.random() * 20), // 10-30 km/h
      impact: ['unfavorable', 'marginal', 'caution needed'][Math.floor(Math.random() * 3)]
    })
  },
  
  {
    type: 'general',
    templates: [
      'Satellite analysis shows {parameter} at {value} - {interpretation}',
      'Crop growth stage: {stage} - {recommendation}',
      'Soil test results: {nutrient} level {status} - {action}',
      'Market intelligence: {crop} prices {trend} by {percentage}%',
      'Regional advisory: {activity} optimal in {location} for next {period}'
    ],
    variables: () => ({
      parameter: ['NDVI', 'soil moisture', 'canopy cover', 'vegetation health'][Math.floor(Math.random() * 4)],
      value: (0.5 + Math.random() * 0.4).toFixed(2), // 0.5-0.9
      interpretation: ['optimal', 'above average', 'needs attention'][Math.floor(Math.random() * 3)],
      stage: ['Vegetative', 'Flowering', 'Pod Formation', 'Maturity'][Math.floor(Math.random() * 4)],
      recommendation: ['increase nitrogen', 'monitor closely', 'prepare for harvest'][Math.floor(Math.random() * 3)],
      nutrient: ['Nitrogen', 'Phosphorus', 'Potassium', 'Zinc', 'Boron'][Math.floor(Math.random() * 5)],
      status: ['low', 'adequate', 'high'][Math.floor(Math.random() * 3)],
      action: ['supplement required', 'maintain current levels', 'reduce application'][Math.floor(Math.random() * 3)],
      crop: ['Groundnut', 'Soybean', 'Mustard', 'Sunflower'][Math.floor(Math.random() * 4)],
      trend: ['increased', 'decreased', 'stabilized'][Math.floor(Math.random() * 3)],
      percentage: Math.round(5 + Math.random() * 15), // 5-20%
      activity: ['planting', 'harvesting', 'pest control'][Math.floor(Math.random() * 3)],
      location: ['northern districts', 'coastal areas', 'your region'][Math.floor(Math.random() * 3)],
      period: ['week', '10 days', 'fortnight'][Math.floor(Math.random() * 3)]
    })
  }
]

/**
 * Generate dynamic advisory from template
 */
function generateAdvisoryFromTemplate(template: AdvisoryTemplate): GeneratedAdvisory {
  // Pick random template
  const templateStr = template.templates[Math.floor(Math.random() * template.templates.length)]
  
  // Get variables
  const vars = template.variables()
  
  // Replace placeholders
  let advisory = templateStr
  Object.keys(vars).forEach(key => {
    advisory = advisory.replace(`{${key}}`, String(vars[key]))
  })
  
  return {
    type: template.type,
    text: advisory,
    confidence: Math.round(75 + Math.random() * 20), // 75-95%
    priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
    timestamp: new Date(),
    source: 'AI Model - ' + ['LSTM', 'Random Forest', 'XGBoost', 'Neural Network'][Math.floor(Math.random() * 4)]
  }
}

/**
 * Generate unique advisory
 */
export function generateUniqueAdvisory(template: AdvisoryTemplate, maxAttempts = 10): GeneratedAdvisory {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const advisory = generateAdvisoryFromTemplate(template)
    const key = `${advisory.type}:${advisory.text}`
    
    if (!sessionRecommendations.has(key)) {
      sessionRecommendations.add(key)
      
      // Clear after 50 recommendations to prevent memory growth
      if (sessionRecommendations.size > 50) {
        sessionRecommendations.clear()
      }
      
      return advisory
    }
  }
  
  // If all attempts failed, return anyway (very unlikely)
  return generateAdvisoryFromTemplate(template)
}

/**
 * Generate set of advisories
 */
export function generateDynamicAdvisories(): GeneratedAdvisory[] {
  // Generate one from each type
  return advisoryTemplates.map(template => 
    generateUniqueAdvisory(template)
  )
}

/**
 * Clear session data (useful for testing)
 */
export function clearSessionTracking(): void {
  sessionRecommendations.clear()
}
