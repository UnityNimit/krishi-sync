/**
 * AI Loading Time Management
 * Provides realistic variable loading times to make AI predictions appear authentic
 */

export type ComplexityLevel = 'simple' | 'medium' | 'complex';

export interface LoadingStage {
  name: string;
  weight: number;
}

export interface StageTimings {
  name: string;
  duration: number;
}

export interface DelayScenario {
  probability: number;
  delay: number;
  message: string;
}

/**
 * Generate realistic variable loading time
 * Returns milliseconds
 */
export function getAILoadingDuration(complexity: ComplexityLevel = 'medium'): number {
  const baseDurations = {
    simple: { min: 1200, max: 2500 },   // 1.2-2.5 seconds
    medium: { min: 1800, max: 3500 },   // 1.8-3.5 seconds
    complex: { min: 2500, max: 4500 }   // 2.5-4.5 seconds
  };
  
  const { min, max } = baseDurations[complexity];
  
  // Add random variation
  const baseTime = min + Math.random() * (max - min);
  
  // Add occasional "network delay" (10% chance)
  const networkDelay = Math.random() < 0.1 ? 500 + Math.random() * 1000 : 0;
  
  // Add occasional "heavy computation" (5% chance)
  const computationDelay = Math.random() < 0.05 ? 1000 + Math.random() * 1500 : 0;
  
  return Math.round(baseTime + networkDelay + computationDelay);
}

/**
 * Simulate multi-stage AI processing with variable sub-timings
 */
export function getStageTimings(totalDuration: number): StageTimings[] {
  // Split total duration into variable stages
  const stages: LoadingStage[] = [
    { name: 'Loading historical data', weight: 0.2 },
    { name: 'Analyzing patterns', weight: 0.3 },
    { name: 'Running ML model', weight: 0.35 },
    { name: 'Computing confidence', weight: 0.15 }
  ];
  
  // Add randomness to weights
  const timings = stages.map(stage => ({
    name: stage.name,
    duration: Math.round(totalDuration * stage.weight * (0.8 + Math.random() * 0.4))
  }));
  
  return timings;
}

/**
 * Mapping features to complexity levels
 */
export const FEATURE_COMPLEXITY: Record<string, ComplexityLevel> = {
  // Fast predictions
  'weather-alerts': 'simple',           // 1.2-2.5s
  'crop-advisory': 'simple',            // 1.2-2.5s
  'pest-risk': 'simple',                // 1.2-2.5s
  
  // Medium complexity
  'demand-supply': 'medium',            // 1.8-3.5s
  'market-insights': 'medium',          // 1.8-3.5s
  'dashboard-recommendations': 'medium', // 1.8-3.5s
  
  // Heavy computation
  'price-forecasting': 'complex',       // 2.5-4.5s
  'multi-region-analysis': 'complex',   // 2.5-4.5s
  'policy-simulations': 'complex'       // 2.5-4.5s
};

/**
 * Occasionally add realistic delays
 */
export function shouldAddDelay(): DelayScenario | null {
  const scenarios: DelayScenario[] = [
    { probability: 0.05, delay: 1500, message: 'High server load - queueing request...' },
    { probability: 0.03, delay: 2000, message: 'Fetching additional data sources...' },
    { probability: 0.02, delay: 2500, message: 'Running extended validation...' }
  ];
  
  for (const scenario of scenarios) {
    if (Math.random() < scenario.probability) {
      return scenario;
    }
  }
  
  return null;
}

/**
 * Get random processing message
 */
export function getRandomProcessingMessage(): string {
  const messages = [
    'Analyzing 10,247 historical data points',
    'Processing market trends from 15 regions',
    'Computing predictions using ensemble model',
    'Cross-validating with satellite imagery',
    'Incorporating weather forecast data',
    'Analyzing seasonal patterns',
    'Running Monte Carlo simulations',
    'Optimizing model parameters',
    'Validating against ground truth data',
    'Calculating confidence intervals'
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Get variable animation speed
 */
export function getAnimationSpeed(): number {
  return 0.6 + Math.random() * 0.6; // 0.6-1.2s
}

/**
 * Get variable pulse delay
 */
export function getPulseDelay(): number {
  return Math.random() * 0.5; // 0-0.5s delay
}
