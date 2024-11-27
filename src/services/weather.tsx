// src/services/weather.ts
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY
const BASE_URL = 'http://api.weatherapi.com/v1'

interface WeatherDay {
  date: string
  day: {
    maxtemp_c: number
    mintemp_c: number
    condition: {
      text: string
      icon: string
      code: number
    }
  }
}

export interface CurrentDayResponse {
  location: {
    name: string
    country: string
    localtime: string
  }
  current: {
    temp_c: number
    condition: {
      text: string
      icon: string
    }
    humidity: number
    wind_kph: number
    feelslike_c: number
  }
  forecast: {
    forecastday: [
      {
        date: string
        day: {
          maxtemp_c: number
          mintemp_c: number
        }
        astro: {
          sunrise: string
          sunset: string
        }
        hour: Array<{
          time: string
          temp_c: number
          condition: {
            text: string
            icon: string
          }
        }>
      }
    ]
  }
}

interface ForecastResponse {
  forecastday: WeatherDay[]
}

export const getCurrentDayWeather = async (lat: number, lon: number): Promise<CurrentDayResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=1&lang=tr&aqi=no`
    )
    if (!response.ok) throw new Error('Hava durumu bilgisi alınamadı')
    return await response.json()
  } catch (error) {
    throw new Error('Hava durumu verisi alınamadı')
    console.log(error)
  }
}

export const getForecastWeather = async (lat: number, lon: number): Promise<ForecastResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=14&lang=tr&aqi=no`
    )
    if (!response.ok) throw new Error('Tahmin bilgisi alınamadı')
    const data = await response.json()

    return {
      forecastday: data.forecast.forecastday.map((day: any) => ({
        date: day.date,
        day: {
          maxtemp_c: day.day.maxtemp_c,
          mintemp_c: day.day.mintemp_c,
          condition: day.day.condition
        }
      }))
    }
  } catch (error) {
    throw new Error('Tahmin verisi alınamadı')
    console.log(error)
  }
}
