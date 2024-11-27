// services/weather-types.ts

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

export interface ForecastResponse {
  forecastday: Array<{
    date: string
    day: {
      maxtemp_c: number
      mintemp_c: number
      condition: {
        text: string
        icon: string
      }
    }
  }>
}
