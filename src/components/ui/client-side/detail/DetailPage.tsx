// src/app/detail/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Container, Grid, Box, CircularProgress } from '@mui/material'
import { getCurrentDayWeather, type CurrentDayResponse } from '@/services/weather'
import { TodayCard } from './components/TodayCard'
import { ForecastCard } from './components/ForecastCard'

interface WeatherDay {
  date: string
  day: {
    maxtemp_c: number
    mintemp_c: number
    condition?: {
      // condition'ı opsiyonel yap
      text: string
      icon: string
    }
  }
}

export default function DetailPage() {
  const searchParams = useSearchParams()
  const [weatherData, setWeatherData] = useState<CurrentDayResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const lat = Number(searchParams.get('lat'))
      const lon = Number(searchParams.get('lon'))

      if (!lat || !lon) return

      try {
        setLoading(true)
        const data = await getCurrentDayWeather(lat, lon)
        setWeatherData(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchParams])

  if (loading || !weatherData) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <TodayCard current={weatherData.current} location={weatherData.location} forecast={weatherData.forecast} />
      <Grid container spacing={2}>
        {weatherData.forecast.forecastday.slice(1).map((forecastDay: WeatherDay, index: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={forecastDay.date}>
            <ForecastCard
              forecast={{
                date: forecastDay.date,
                day: {
                  maxtemp_c: forecastDay.day.maxtemp_c,
                  mintemp_c: forecastDay.day.mintemp_c,
                  condition: forecastDay.day.condition || { text: '', icon: '' }
                }
              }}
              index={index}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
