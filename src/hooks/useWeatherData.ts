import { useCallback, useEffect, useRef, useState } from 'react'
import type { WeatherApiResponse } from '../types'
import { createMockWeatherResponse, DEFAULT_WEATHER_COORDINATES } from '../data/weatherMock'

interface UseWeatherDataOptions {
  lat?: number
  lon?: number
  refreshIntervalMs?: number
  disableAutoRefresh?: boolean
}

interface UseWeatherDataResult {
  data: WeatherApiResponse | null
  loading: boolean
  error: string | null
  isFallback: boolean
  refetch: () => void
}

const DEFAULT_REFRESH_INTERVAL = 10 * 60 * 1000

export function useWeatherData(options: UseWeatherDataOptions = {}): UseWeatherDataResult {
  const {
    lat = DEFAULT_WEATHER_COORDINATES.lat,
    lon = DEFAULT_WEATHER_COORDINATES.lon,
    refreshIntervalMs = DEFAULT_REFRESH_INTERVAL,
    disableAutoRefresh = false
  } = options

  const [data, setData] = useState<WeatherApiResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isFallback, setIsFallback] = useState<boolean>(false)

  const isMountedRef = useRef(true)
  const inFlightController = useRef<AbortController | null>(null)

  useEffect(() => () => {
    isMountedRef.current = false
    if (inFlightController.current) {
      inFlightController.current.abort()
      inFlightController.current = null
    }
  }, [])

  const fetchWeather = useCallback(async () => {
    if (inFlightController.current) {
      inFlightController.current.abort()
    }

    const controller = new AbortController()
    inFlightController.current = controller

    if (isMountedRef.current) {
      setLoading(true)
      setError(null)
    }

    try {
      const params = new URLSearchParams({
        lat: lat.toFixed(4),
        lon: lon.toFixed(4)
      })

      const response = await fetch(`/api/weather?${params.toString()}`, {
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(`Weather service returned ${response.status}`)
      }

      const payload = (await response.json()) as WeatherApiResponse

      if (!isMountedRef.current) {
        return
      }

      setData(payload)
      setIsFallback(payload.source !== 'live')
      setError(null)
    } catch (err) {
      if (!isMountedRef.current) {
        return
      }

      if ((err as Error).name === 'AbortError') {
        return
      }

      const fallbackPayload = createMockWeatherResponse()
      setData(fallbackPayload)
      setIsFallback(true)
      setError((err as Error).message ?? 'Unable to load weather data')
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }

      if (inFlightController.current === controller) {
        inFlightController.current = null
      }
    }
  }, [lat, lon])

  useEffect(() => {
    fetchWeather()

    if (disableAutoRefresh) {
      return
    }

    const intervalId = window.setInterval(() => {
      fetchWeather()
    }, refreshIntervalMs)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [fetchWeather, disableAutoRefresh, refreshIntervalMs])

  return {
    data,
    loading,
    error,
    isFallback,
    refetch: fetchWeather
  }
}
