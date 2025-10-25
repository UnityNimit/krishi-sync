import type { PluginOption } from 'vite'
import type { WeatherApiResponse, WeatherCurrent, WeatherForecastEntry, WeatherAlert } from '../src/types'
import { createMockWeatherResponse, DEFAULT_WEATHER_COORDINATES } from '../src/data/weatherMock'

const CACHE_TTL_MS = 10 * 60 * 1000

interface CacheEntry {
  payload: WeatherApiResponse
  expiresAt: number
}

const weatherCache = new Map<string, CacheEntry>()

const toFixedKey = (value: number) => value.toFixed(2)

const clampCoordinate = (value: number, fallback: number) => {
  if (Number.isFinite(value)) {
    if (value > 90) return 90
    if (value < -90) return -90
    return value
  }
  return fallback
}

const clampLongitude = (value: number, fallback: number) => {
  if (Number.isFinite(value)) {
    if (value > 180) return 180
    if (value < -180) return -180
    return value
  }
  return fallback
}

const buildCacheKey = (lat: number, lon: number) => `${toFixedKey(lat)},${toFixedKey(lon)}`

const msToIso = (dt: number) => new Date(dt).toISOString()

const kmhFromMs = (value: number | undefined) => Math.round((value ?? 0) * 3.6)

async function fetchFromOpenWeather(lat: number, lon: number): Promise<WeatherApiResponse> {
  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    throw new Error('OPENWEATHER_API_KEY is not configured')
  }

  const searchParams = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    units: 'metric',
    appid: apiKey
  })

  const fetchFn: any = (globalThis as any).fetch

  if (typeof fetchFn !== 'function') {
    throw new Error('fetch is not available in this runtime')
  }

  const [currentRes, forecastRes] = await Promise.all([
    fetchFn(`https://api.openweathermap.org/data/2.5/weather?${searchParams.toString()}`),
    fetchFn(`https://api.openweathermap.org/data/2.5/forecast?${searchParams.toString()}`)
  ])

  if (!currentRes.ok) {
    const text = await currentRes.text()
    throw new Error(`Current weather fetch failed: ${currentRes.status} ${text}`)
  }

  if (!forecastRes.ok) {
    const text = await forecastRes.text()
    throw new Error(`Forecast fetch failed: ${forecastRes.status} ${text}`)
  }

  const currentJson = await currentRes.json()
  const forecastJson = await forecastRes.json()

  return normalizeWeatherPayload(currentJson, forecastJson)
}

function normalizeWeatherPayload(current: any, forecast: any): WeatherApiResponse {
  const now = new Date()
  const locationParts = [current?.name, current?.sys?.country].filter(Boolean) as string[]
  const location = locationParts.length > 0 ? locationParts.join(', ') : 'Farm location'

  const currentWindKmh = kmhFromMs(current?.wind?.speed)
  const precipitationChance = forecast?.list?.[0]?.pop ? Math.round(forecast.list[0].pop * 100) : 0

  const normalizedCurrent: WeatherCurrent = {
    temperature: Math.round(current?.main?.temp ?? 0),
    feelsLike: Math.round(current?.main?.feels_like ?? 0),
    humidity: Math.round(current?.main?.humidity ?? 0),
    windSpeed: currentWindKmh,
    precipitationChance,
    description: current?.weather?.[0]?.description ?? 'Unavailable',
    icon: current?.weather?.[0]?.icon ?? '01d'
  }

  const forecastEntries: WeatherForecastEntry[] = Array.isArray(forecast?.list)
    ? (forecast.list as any[]).slice(0, 8).map((entry) => ({
        timestamp: entry?.dt ? msToIso(entry.dt * 1000) : entry?.dt_txt ?? now.toISOString(),
        temperature: Math.round(entry?.main?.temp ?? normalizedCurrent.temperature),
        precipitationChance: Math.round((entry?.pop ?? 0) * 100),
        windSpeed: kmhFromMs(entry?.wind?.speed),
        description: entry?.weather?.[0]?.description ?? normalizedCurrent.description,
        icon: entry?.weather?.[0]?.icon ?? normalizedCurrent.icon
      }))
    : []

  const alerts = deriveWeatherAlerts(normalizedCurrent, forecastEntries)

  return {
    location,
    source: 'live',
    lastUpdated: now.toISOString(),
    current: normalizedCurrent,
    forecast: forecastEntries,
    alerts: alerts.length > 0 ? alerts : createMockWeatherResponse().alerts
  }
}

function deriveWeatherAlerts(current: WeatherCurrent, forecast: WeatherForecastEntry[]): WeatherAlert[] {
  const alerts: WeatherAlert[] = []
  const highWind = current.windSpeed >= 30 || forecast.find((entry) => entry.windSpeed >= 30)
  const heavyRainSlot = forecast.find((entry) => entry.precipitationChance >= 60)
  const heatSpike = forecast.find((entry) => entry.temperature >= 35)
  const coolNight = forecast.find((entry) => entry.temperature <= 18)

  if (heavyRainSlot) {
    alerts.push({
      id: `rain-${heavyRainSlot.timestamp}`,
      title: 'High rainfall probability ahead',
      severity: 'watch',
      category: 'crop',
      description:
        'Radar projections indicate a concentrated rain band in the next forecast window. Extended leaf moisture will increase fungal disease pressure.',
      impactAreas: ['Fungicide scheduling', 'Field scouting cadence'],
      recommendedActions: [
        'Advance preventive spray plans before rainfall begins.',
        'Plan follow-up scouting 24 hours after rainfall to inspect for lesions.'
      ]
    })
  }

  if (highWind) {
    alerts.push({
      id: `wind-${forecast[0]?.timestamp ?? Date.now()}`,
      title: 'Strong wind gusts may impact logistics',
      severity: 'warning',
      category: 'logistics',
      description:
        'Wind speeds above 30 km/h are expected. Tarpaulin cover and transport scheduling should be adjusted to avoid load loss and spray drift.',
      impactAreas: ['Produce dispatch routes', 'Field spray operations'],
      recommendedActions: [
        'Shift open-body transport to earlier calmer windows.',
        'Pause pesticide sprays until gusts fall below 20 km/h.'
      ]
    })
  }

  if (heatSpike) {
    alerts.push({
      id: `heat-${heatSpike.timestamp}`,
      title: 'Afternoon heat stress expected',
      severity: 'info',
      category: 'general',
      description:
        'Temperatures are projected to cross 35°C. Crop evapotranspiration and labor productivity will be affected during peak afternoon hours.',
      impactAreas: ['Irrigation scheduling', 'Farm labor management'],
      recommendedActions: [
        'Advance irrigation cycles to early morning to reduce stress.',
        'Stagger labor-intensive tasks to cooler hours.'
      ]
    })
  } else if (coolNight) {
    alerts.push({
      id: `cool-${coolNight.timestamp}`,
      title: 'Cooler night temperatures on the horizon',
      severity: 'info',
      category: 'general',
      description:
        'Night-time temperatures will dip below 18°C. Dew formation may extend drying times for harvested produce.',
      impactAreas: ['Post-harvest drying yards', 'Cold-sensitive crops'],
      recommendedActions: [
        'Ensure harvested lots are protected from overnight moisture.',
        'Monitor for condensation inside covered storage.'
      ]
    })
  }

  return alerts
}

async function getWeather(lat: number, lon: number): Promise<WeatherApiResponse> {
  const fallbackLat = DEFAULT_WEATHER_COORDINATES.lat
  const fallbackLon = DEFAULT_WEATHER_COORDINATES.lon
  const sanitizedLat = clampCoordinate(lat, fallbackLat)
  const sanitizedLon = clampLongitude(lon, fallbackLon)
  const cacheKey = buildCacheKey(sanitizedLat, sanitizedLon)
  const cached = weatherCache.get(cacheKey)
  const now = Date.now()

  if (cached && cached.expiresAt > now) {
    return cached.payload
  }

  try {
    const payload = await fetchFromOpenWeather(sanitizedLat, sanitizedLon)
    weatherCache.set(cacheKey, { payload, expiresAt: now + CACHE_TTL_MS })
    return payload
  } catch (error) {
    const mockPayload = createMockWeatherResponse()
    weatherCache.set(cacheKey, { payload: mockPayload, expiresAt: now + CACHE_TTL_MS / 2 })
    return mockPayload
  }
}

type Middleware = (req: any, res: any, next: () => void) => void

function createWeatherMiddleware(): Middleware {
  return async (req, res, next) => {
    const rawUrl = (req?.url ?? req?.originalUrl ?? req?.headers?.['x-original-url']) as string | undefined

    if (!rawUrl || !rawUrl.startsWith('/api/weather')) {
      next()
      return
    }

    try {
      const requestUrl = new URL(rawUrl, 'http://localhost')
      const latParam = requestUrl.searchParams.get('lat')
      const lonParam = requestUrl.searchParams.get('lon')
      const lat = latParam ? parseFloat(latParam) : Number.NaN
      const lon = lonParam ? parseFloat(lonParam) : Number.NaN
      const payload = await getWeather(lat, lon)

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=600')
      res.end(JSON.stringify(payload))
    } catch (error) {
      const fallback = createMockWeatherResponse()
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'public, max-age=30')
      res.end(JSON.stringify(fallback))
    }
  }
}

export function weatherApiPlugin(): PluginOption {
  return {
    name: 'agri-weather-api-plugin',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(createWeatherMiddleware())
    },
    configurePreviewServer(server) {
      server.middlewares.use(createWeatherMiddleware())
    }
  }
}
