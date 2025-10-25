/**
 * Dynamic AI prediction generation utilities
 * Provides varied, ML-like predictions that change on each load
 */

import { generateDynamicAdvisories as generateTemplateAdvisories } from '../lib/dynamicAdvisories'

export interface DynamicPricePrediction {
  date: string
  predicted: number
  confidenceLower: number
  confidenceUpper: number
  confidence: number
}

export interface DynamicAdvisory {
  text: string
  timestamp: Date
  priority: 'high' | 'medium' | 'low'
  confidence: number
  category: string
}

export interface DemandSupplyPrediction {
  month: string
  supply: number
  demand: number
  confidence: number
}

export interface PestRiskPrediction {
  name: string
  riskLevel: number
  trend: 'increasing' | 'stable' | 'decreasing'
  affectedArea: string
  confidence: number
  lastDetected: Date
}

/**
 * Generate dynamic price predictions that vary each time
 * Simulates ML model output with realistic variation
 */
export function generateDynamicPredictions(basePrice = 8500, months = 6): DynamicPricePrediction[] {
  const volatility = 0.15 // 15% variation
  const predictions: DynamicPricePrediction[] = []
  const today = new Date()
  
  for (let i = 0; i < months; i++) {
    const date = new Date(today)
    date.setMonth(date.getMonth() + i)
    
    // Add random walk with trend
    const trend = i * 50 // Slight upward trend
    const randomness = (Math.random() - 0.5) * 2 * basePrice * volatility
    const seasonality = Math.sin(i * Math.PI / 3) * 300 // Seasonal variation
    
    const predictedPrice = basePrice + trend + randomness + seasonality
    
    // Confidence interval (wider for further predictions)
    const confidenceWidth = 200 + (i * 100)
    
    predictions.push({
      date: date.toISOString().split('T')[0],
      predicted: Math.round(predictedPrice),
      confidenceLower: Math.round(predictedPrice - confidenceWidth),
      confidenceUpper: Math.round(predictedPrice + confidenceWidth),
      confidence: Math.round(95 - (i * 3)) // Confidence decreases over time
    })
  }
  
  return predictions
}

/**
 * Generate dynamic crop advisories with variation
 */
export function generateDynamicAdvisories(): DynamicAdvisory[] {
  // Use the dynamic advisory system for varied recommendations
  const templateAdvisories = generateTemplateAdvisories()
  
  // Convert to the expected format
  return templateAdvisories.map(advisory => ({
    text: advisory.text,
    timestamp: advisory.timestamp,
    priority: advisory.priority,
    confidence: advisory.confidence,
    category: advisory.type
  }))
}

/**
 * Generate dynamic demand-supply predictions
 */
export function generateDemandSupplyPredictions(months = 12): DemandSupplyPrediction[] {
  const baseSupply = 42.61 // Million tonnes (current)
  const baseDemand = 27.8 // Million tonnes
  
  const predictions: DemandSupplyPrediction[] = []
  const today = new Date()
  
  for (let i = 0; i < months; i++) {
    const date = new Date(today)
    date.setMonth(date.getMonth() + i)
    
    // Add seasonal variation and growth
    const seasonalSupply = Math.sin(i * Math.PI / 6) * 2
    const seasonalDemand = Math.sin((i + 2) * Math.PI / 6) * 1.5
    const randomSupply = (Math.random() - 0.5) * 1.5
    const randomDemand = (Math.random() - 0.5) * 1
    
    predictions.push({
      month: date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      supply: parseFloat((baseSupply + seasonalSupply + randomSupply + (i * 0.1)).toFixed(2)),
      demand: parseFloat((baseDemand + seasonalDemand + randomDemand + (i * 0.15)).toFixed(2)),
      confidence: Math.round(90 - (i * 2))
    })
  }
  
  return predictions
}

/**
 * Generate pest risk predictions with ML indicators
 */
export function generatePestRiskPredictions(): PestRiskPrediction[] {
  const pests = [
    'Aphids', 'Leaf Miners', 'White Grubs', 'Stem Borers', 
    'Pod Borers', 'Thrips', 'Jassids'
  ]
  
  return pests.map(pest => ({
    name: pest,
    riskLevel: Math.round(Math.random() * 100),
    trend: (['increasing', 'stable', 'decreasing'][Math.floor(Math.random() * 3)]) as 'increasing' | 'stable' | 'decreasing',
    affectedArea: `${Math.round(Math.random() * 1000)} hectares`,
    confidence: Math.round(70 + Math.random() * 25),
    lastDetected: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
  })).sort((a, b) => b.riskLevel - a.riskLevel)
}

/**
 * Add random delay to simulate ML model processing time
 * Now uses the new variable loading system by default
 * Returns a promise that resolves after a variable duration
 */
export function simulateAIProcessing(minMs = 1500, maxMs = 4000): Promise<void> {
  const delay = minMs + Math.random() * (maxMs - minMs)
  return new Promise(resolve => setTimeout(resolve, delay))
}

/**
 * Generate varied crop recommendations based on base data
 * Adds randomness to suitability scores and reasons
 */
export function addDynamicVariation<T extends { suitabilityScore?: number }>(items: T[]): T[] {
  return items.map(item => ({
    ...item,
    // Add ±5% variation to suitability scores
    ...(item.suitabilityScore !== undefined && {
      suitabilityScore: Math.max(0, Math.min(100, 
        Math.round(item.suitabilityScore + (Math.random() - 0.5) * 10)
      ))
    })
  }))
}
