import { PriceHistoryEntry } from '../data/priceHistoryData'

export interface ForecastResult {
  date: string
  predictedPrice: number
  confidence: 'high' | 'medium' | 'low'
  confidenceInterval: {
    lower: number
    upper: number
  }
}

/**
 * Calculate Simple Moving Average (SMA)
 */
export const calculateMovingAverage = (
  data: PriceHistoryEntry[],
  window: number = 3
): number[] => {
  const result: number[] = []
  
  for (let i = 0; i < data.length; i++) {
    if (i < window - 1) {
      result.push(data[i].price)
    } else {
      const sum = data.slice(i - window + 1, i + 1).reduce((acc, entry) => acc + entry.price, 0)
      result.push(sum / window)
    }
  }
  
  return result
}

/**
 * Linear Regression for price forecasting
 * Returns slope and intercept for the line y = mx + b
 */
const linearRegression = (xValues: number[], yValues: number[]): { slope: number; intercept: number } => {
  const n = xValues.length
  let sumX = 0
  let sumY = 0
  let sumXY = 0
  let sumXX = 0
  
  for (let i = 0; i < n; i++) {
    sumX += xValues[i]
    sumY += yValues[i]
    sumXY += xValues[i] * yValues[i]
    sumXX += xValues[i] * xValues[i]
  }
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n
  
  return { slope, intercept }
}

/**
 * Calculate standard deviation
 */
const standardDeviation = (values: number[]): number => {
  const mean = values.reduce((acc, val) => acc + val, 0) / values.length
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2))
  const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length
  return Math.sqrt(variance)
}

/**
 * Generate price forecast using linear regression
 */
export const generatePriceForecast = (
  historicalData: PriceHistoryEntry[],
  forecastMonths: number = 6
): ForecastResult[] => {
  // Prepare data for regression
  const xValues = historicalData.map((_, index) => index)
  const yValues = historicalData.map(entry => entry.price)
  
  // Calculate linear regression
  const { slope, intercept } = linearRegression(xValues, yValues)
  
  // Calculate standard deviation for confidence intervals
  const predictions = xValues.map(x => slope * x + intercept)
  const errors = yValues.map((y, i) => y - predictions[i])
  const stdDev = standardDeviation(errors)
  
  // Generate forecasts
  const forecasts: ForecastResult[] = []
  const lastDate = new Date(historicalData[historicalData.length - 1].date)
  
  for (let i = 1; i <= forecastMonths; i++) {
    const x = historicalData.length + i - 1
    const predictedPrice = Math.round(slope * x + intercept)
    
    // Confidence decreases as we forecast further into the future
    let confidence: 'high' | 'medium' | 'low'
    let confidenceMultiplier: number
    
    if (i <= 2) {
      confidence = 'high'
      confidenceMultiplier = 1.0
    } else if (i <= 4) {
      confidence = 'medium'
      confidenceMultiplier = 1.5
    } else {
      confidence = 'low'
      confidenceMultiplier = 2.0
    }
    
    const forecastDate = new Date(lastDate)
    forecastDate.setMonth(forecastDate.getMonth() + i)
    
    forecasts.push({
      date: forecastDate.toISOString().split('T')[0],
      predictedPrice,
      confidence,
      confidenceInterval: {
        lower: Math.round(predictedPrice - stdDev * confidenceMultiplier),
        upper: Math.round(predictedPrice + stdDev * confidenceMultiplier)
      }
    })
  }
  
  return forecasts
}

/**
 * Generate forecast using exponential smoothing
 */
export const generateExponentialSmoothedForecast = (
  historicalData: PriceHistoryEntry[],
  alpha: number = 0.3,
  forecastMonths: number = 6
): ForecastResult[] => {
  // Calculate exponential smoothing
  const smoothedValues: number[] = [historicalData[0].price]
  
  for (let i = 1; i < historicalData.length; i++) {
    const smoothed = alpha * historicalData[i].price + (1 - alpha) * smoothedValues[i - 1]
    smoothedValues.push(smoothed)
  }
  
  // Estimate trend
  const lastFew = smoothedValues.slice(-3)
  const avgTrend = (lastFew[lastFew.length - 1] - lastFew[0]) / (lastFew.length - 1)
  
  // Generate forecasts
  const forecasts: ForecastResult[] = []
  const lastDate = new Date(historicalData[historicalData.length - 1].date)
  let lastValue = smoothedValues[smoothedValues.length - 1]
  
  // Calculate error for confidence intervals
  const errors = historicalData.map((entry, i) => entry.price - smoothedValues[i])
  const stdDev = standardDeviation(errors)
  
  for (let i = 1; i <= forecastMonths; i++) {
    lastValue = lastValue + avgTrend
    const predictedPrice = Math.round(lastValue)
    
    let confidence: 'high' | 'medium' | 'low'
    let confidenceMultiplier: number
    
    if (i <= 2) {
      confidence = 'high'
      confidenceMultiplier = 1.0
    } else if (i <= 4) {
      confidence = 'medium'
      confidenceMultiplier = 1.5
    } else {
      confidence = 'low'
      confidenceMultiplier = 2.0
    }
    
    const forecastDate = new Date(lastDate)
    forecastDate.setMonth(forecastDate.getMonth() + i)
    
    forecasts.push({
      date: forecastDate.toISOString().split('T')[0],
      predictedPrice,
      confidence,
      confidenceInterval: {
        lower: Math.round(predictedPrice - stdDev * confidenceMultiplier),
        upper: Math.round(predictedPrice + stdDev * confidenceMultiplier)
      }
    })
  }
  
  return forecasts
}

/**
 * Calculate price volatility
 */
export const calculateVolatility = (historicalData: PriceHistoryEntry[]): number => {
  const prices = historicalData.map(entry => entry.price)
  const returns = []
  
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1])
  }
  
  return standardDeviation(returns) * 100 // Return as percentage
}

/**
 * Identify price trend
 */
export const identifyTrend = (historicalData: PriceHistoryEntry[]): {
  direction: 'upward' | 'downward' | 'stable'
  strength: number
  description: string
} => {
  const xValues = historicalData.map((_, index) => index)
  const yValues = historicalData.map(entry => entry.price)
  const { slope } = linearRegression(xValues, yValues)
  
  const avgPrice = yValues.reduce((acc, val) => acc + val, 0) / yValues.length
  const normalizedSlope = (slope / avgPrice) * 100
  
  let direction: 'upward' | 'downward' | 'stable'
  let strength: number
  let description: string
  
  if (Math.abs(normalizedSlope) < 0.5) {
    direction = 'stable'
    strength = 0
    description = 'Prices are relatively stable with minimal fluctuation'
  } else if (normalizedSlope > 0) {
    direction = 'upward'
    strength = Math.min(normalizedSlope * 10, 100)
    description = `Prices showing ${normalizedSlope > 2 ? 'strong' : 'moderate'} upward trend`
  } else {
    direction = 'downward'
    strength = Math.min(Math.abs(normalizedSlope) * 10, 100)
    description = `Prices showing ${normalizedSlope < -2 ? 'strong' : 'moderate'} downward trend`
  }
  
  return { direction, strength, description }
}

/**
 * Calculate market insights
 */
export interface MarketInsight {
  volatility: number
  volatilityLevel: 'low' | 'moderate' | 'high' | 'very high'
  trend: ReturnType<typeof identifyTrend>
  averagePrice: number
  priceRange: {
    min: number
    max: number
  }
  recommendation: string
}

export const calculateMarketInsights = (historicalData: PriceHistoryEntry[]): MarketInsight => {
  const volatility = calculateVolatility(historicalData)
  const trend = identifyTrend(historicalData)
  const prices = historicalData.map(entry => entry.price)
  
  let volatilityLevel: 'low' | 'moderate' | 'high' | 'very high'
  if (volatility < 5) volatilityLevel = 'low'
  else if (volatility < 10) volatilityLevel = 'moderate'
  else if (volatility < 15) volatilityLevel = 'high'
  else volatilityLevel = 'very high'
  
  const averagePrice = Math.round(prices.reduce((acc, val) => acc + val, 0) / prices.length)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  
  let recommendation: string
  if (trend.direction === 'upward' && volatilityLevel === 'low') {
    recommendation = 'Favorable market conditions. Consider increasing procurement.'
  } else if (trend.direction === 'downward' && volatilityLevel === 'high') {
    recommendation = 'Market instability detected. Implement price support mechanisms.'
  } else if (volatilityLevel === 'very high') {
    recommendation = 'High volatility. Monitor market closely and consider intervention.'
  } else if (trend.direction === 'stable') {
    recommendation = 'Market stable. Continue current policies.'
  } else {
    recommendation = 'Mixed signals. Adopt cautious approach with flexible policies.'
  }
  
  return {
    volatility,
    volatilityLevel,
    trend,
    averagePrice,
    priceRange: {
      min: minPrice,
      max: maxPrice
    },
    recommendation
  }
}
