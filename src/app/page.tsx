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
        const defaultLat = 41.0477
        const defaultLon = 28.9347

        const weather = await getCurrentDayWeather(defaultLat, defaultLon)
        setWeatherData(weather)

        // IP tabanlı konum bilgisi al
        try {
          const ipRes = await fetch('https://ipapi.co/json/')
          const ipData = await ipRes.json()
          if (ipData.latitude && ipData.longitude) {
            const locationWeather = await getCurrentDayWeather(ipData.latitude, ipData.longitude)
            setWeatherData(locationWeather)
          }
        } catch {
          // IP konum hatası durumunda varsayılan değerleri kullanmaya devam et
        }
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
