'use client'

import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { TodayCard } from '@/components/ui/client-side/detail/components/TodayCard'
import { getCurrentDayWeather } from '@/services/weather'
import type { CurrentDayResponse } from '@/services/weather'

export default function HomePage() {
  const [weatherData, setWeatherData] = useState<CurrentDayResponse | null>(null)

  useEffect(() => {
    async function getData() {
      try {
        const ipRes = await fetch('https://ipapi.co/json/')
        const ipData = await ipRes.json()
        const weather = await getCurrentDayWeather(ipData.latitude, ipData.longitude)
        setWeatherData(weather)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    getData()
  }, [])

  return (
    <main>
      <Container maxWidth='xl' sx={{ py: 4 }}>
        {weatherData && (
          <TodayCard current={weatherData.current} location={weatherData.location} forecast={weatherData.forecast} />
        )}
      </Container>
    </main>
  )
}
