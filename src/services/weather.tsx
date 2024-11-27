// src/services/weather.ts

const WEATHER_API_KEY = '0691c43cd7e04eaa9dc85153242711'
const BASE_URL = 'http://api.weatherapi.com/v1'

// Tip tanımlamaları
export interface WeatherCondition {
  text: string
  icon: string
  code: number
}

export interface CurrentWeather {
  temp_c: number
  feelslike_c: number
  condition: WeatherCondition
  wind_kph: number
  wind_dir: string
  pressure_mb: number
  precip_mm: number
  humidity: number
  cloud: number
  vis_km: number
  uv: number
  last_updated: string
}

export interface DayForecast {
  maxtemp_c: number
  mintemp_c: number
  avgtemp_c: number
  condition: WeatherCondition
  daily_chance_of_rain: number
  totalprecip_mm: number
  avghumidity: number
  maxwind_kph: number
  uv: number
}

export interface ForecastDay {
  date: string
  day: DayForecast
  astro: {
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moon_phase: string
  }
  hour: Array<{
    time: string
    temp_c: number
    condition: WeatherCondition
    chance_of_rain: number
  }>
}

export interface WeatherResponse {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    localtime: string
  }
  current: CurrentWeather
  forecast: {
    forecastday: ForecastDay[]
  }
}

// Hava durumu verilerini getir (anlık + 14 günlük tahmin)
export const getWeatherData = async (lat: number, lon: number): Promise<WeatherResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=14&lang=tr&aqi=no`
    )

    if (!response.ok) {
      throw new Error('Hava durumu bilgisi alınamadı')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Weather API Error:', error)
    throw new Error('Hava durumu verisi alınamadı. Lütfen daha sonra tekrar deneyin.')
  }
}

// Saatlik tahmin verilerini getir
export const getHourlyForecast = async (lat: number, lon: number, days: number = 1): Promise<WeatherResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=${days}&lang=tr&aqi=no&hour=24`
    )

    if (!response.ok) {
      throw new Error('Saatlik tahmin bilgisi alınamadı')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Weather API Error:', error)
    throw new Error('Saatlik tahmin verisi alınamadı. Lütfen daha sonra tekrar deneyin.')
  }
}
