// src/app/detail/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Container, Grid, Box, CircularProgress } from '@mui/material'
import { WeatherResponse, getWeatherData } from '@/services/weather'

import { ForecastCard } from './components/ForecastCard'
import { TodayCard } from './components/TodayCard'

export default function DetailPage() {
  const searchParams = useSearchParams()
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const lat = Number(searchParams.get('lat'))
      const lon = Number(searchParams.get('lon'))

      if (!lat || !lon) return

      try {
        setLoading(true)
        const data = await getWeatherData(lat, lon)
        setWeatherData(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchParams])

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
        <CircularProgress />
      </Box>
    )
  }

  if (!weatherData) return null

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      {/* Ana hava durumu kartı */}
      <TodayCard current={weatherData.current} location={weatherData.location} forecast={weatherData.forecast} />

      {/* Tahmin kartları */}
      <Grid container spacing={2}>
        {weatherData.forecast.forecastday.slice(1).map((day, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={day.date}>
            <ForecastCard forecast={day} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
