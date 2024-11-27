// src/app/detail/page.tsx
'use client'

import { Suspense } from 'react'
import { Container, Grid, Box, CircularProgress } from '@mui/material'
import { ForecastCard } from '@/components/ui/client-side/detail/components/ForecastCard'
import { TodayCard } from '@/components/ui/client-side/detail/components/TodayCard'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCurrentDayWeather, getForecastWeather } from '@/services/weather'
import type { CurrentDayResponse, ForecastResponse } from '@/services/weather'

export default function DetailPage() {
  return (
    <Suspense
      fallback={
        <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
          <CircularProgress />
        </Box>
      }
    >
      <DetailContent />
    </Suspense>
  )
}

function DetailContent() {
  const searchParams = useSearchParams()
  const [currentDay, setCurrentDay] = useState<CurrentDayResponse | null>(null)
  const [forecast, setForecast] = useState<ForecastResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const lat = Number(searchParams.get('lat'))
      const lon = Number(searchParams.get('lon'))

      if (!lat || !lon) return

      try {
        setLoading(true)
        const [currentData, forecastData] = await Promise.all([
          getCurrentDayWeather(lat, lon),
          getForecastWeather(lat, lon)
        ])
        setCurrentDay(currentData)
        setForecast(forecastData)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchParams])

  if (loading || !currentDay || !forecast) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <TodayCard current={currentDay.current} location={currentDay.location} forecast={currentDay.forecast} />
      <Grid container spacing={2}>
        {forecast.forecastday.slice(1).map((day, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={day.date}>
            <ForecastCard forecast={day} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
