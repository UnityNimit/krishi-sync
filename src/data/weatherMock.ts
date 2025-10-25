import type { WeatherApiResponse } from '../types'

export const DEFAULT_WEATHER_COORDINATES = {
  lat: 22.7196,
  lon: 75.8577
}

const forecastProfiles = [
  { temp: 29, pop: 0.6, wind: 14, description: 'Humid with passing showers', icon: '10d' },
  { temp: 27, pop: 0.55, wind: 18, description: 'Thunderclouds building', icon: '11d' },
  { temp: 25, pop: 0.4, wind: 20, description: 'Gusty winds and drizzle', icon: '10n' },
  { temp: 26, pop: 0.3, wind: 12, description: 'Clearing skies overnight', icon: '04n' },
  { temp: 30, pop: 0.2, wind: 10, description: 'Warm and humid afternoon', icon: '02d' }
]

export function createMockWeatherResponse(): WeatherApiResponse {
  const now = new Date()

  return {
    location: 'Indore, Madhya Pradesh',
    source: 'mock',
    lastUpdated: now.toISOString(),
    current: {
      temperature: 28,
      feelsLike: 31,
      humidity: 72,
      windSpeed: 16,
      precipitationChance: 58,
      description: 'Moist conditions with scattered showers',
      icon: '10d'
    },
    forecast: forecastProfiles.slice(0, 5).map((profile, index) => {
      const date = new Date(now.getTime() + (index + 1) * 3 * 60 * 60 * 1000)

      return {
        timestamp: date.toISOString(),
        temperature: profile.temp,
        precipitationChance: Math.round(profile.pop * 100),
        windSpeed: profile.wind,
        description: profile.description,
        icon: profile.icon
      }
    }),
    alerts: [
      {
        id: 'mock-crop-fungal-watch',
        title: 'High humidity favors foliar fungal outbreaks',
        severity: 'watch',
        category: 'crop',
        description:
          'Evening humidity is projected to stay above 70% for six hours. Leaf wetness will extend the window for rust and blight development on wheat and chickpea.',
        impactAreas: ['Wheat tillering stage', 'Chickpea canopy management'],
        recommendedActions: [
          'Advance the next preventive fungicide spray by 24 hours.',
          'Increase field scouting frequency to every other day through the weekend.'
        ]
      },
      {
        id: 'mock-logistics-gust-warning',
        title: 'Strong gusts and lightning risk after sunset',
        severity: 'warning',
        category: 'logistics',
        description:
          'Forecast models indicate wind gusts above 35 km/h with lightning between 18:00 and 21:00. Field harvest runs and evening dispatches may be disrupted.',
        impactAreas: ['Harvest scheduling', 'Evening dispatch routes'],
        recommendedActions: [
          'Reschedule combine operations to the morning window before 16:00.',
          'Stage covered storage near loading zones to keep produce dry.'
        ]
      },
      {
        id: 'mock-general-rain-escort',
        title: 'Intermittent showers across the block',
        severity: 'info',
        category: 'general',
        description:
          'Light rainfall bands will move east to west through the district. Expect quick showers with accumulated rainfall of 12-15 mm.',
        impactAreas: ['Field scouting rounds', 'Inter-village transport'],
        recommendedActions: [
          'Equip field teams with rain gear and waterproof data loggers.',
          'Allow 20 extra minutes for inter-village transport commitments.'
        ]
      }
    ]
  }
}
