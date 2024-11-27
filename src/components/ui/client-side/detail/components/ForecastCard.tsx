// src/components/weather/ForecastCard.tsx
import { Card, CardContent, Typography, Box, useTheme, Grid } from '@mui/material'
import { WeatherIcon } from './WeatherIcon'
import { WaterDrop, Air } from '@mui/icons-material'
import { getWeatherColors } from '@/types/weather'

interface ForecastCardProps {
  forecast: {
    date: string
    day: {
      maxtemp_c: number
      mintemp_c: number
      avgtemp_c: number
      avghumidity: number
      maxwind_kph: number
      condition: {
        text: string
        icon: string
      }
      daily_chance_of_rain: number
    }
  }
  index: number
}

export const ForecastCard = ({ forecast, index }: ForecastCardProps) => {
  const theme = useTheme()
  const colors = getWeatherColors(theme.palette.mode === 'dark')
  const isNightTime = new Date().getHours() >= 18 || new Date().getHours() < 6

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 2,
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        border: 1,
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        animation: `slideIn 0.5s ease-out ${index * 0.1}s`,
        '@keyframes slideIn': {
          from: {
            opacity: 0,
            transform: 'translateX(-20px)'
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)'
          }
        },
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 3,
          borderColor: 'primary.main'
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Grid container alignItems='center' spacing={2}>
          {/* Sol Taraf - Tarih */}
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              {new Date(forecast.date).toLocaleDateString('tr-TR', {
                weekday: 'short'
              })}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {new Date(forecast.date).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'short'
              })}
            </Typography>
          </Grid>

          {/* İkon ve Durum */}
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            <WeatherIcon condition={forecast.day.condition.text} isNight={isNightTime} size={40} />
          </Grid>

          {/* Sıcaklık */}
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Typography sx={{ fontWeight: 'bold', color: 'error.main' }}>
                {Math.round(forecast.day.maxtemp_c)}°
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{Math.round(forecast.day.mintemp_c)}°</Typography>
            </Box>
          </Grid>

          {/* Nem ve Rüzgar */}
          <Grid item xs={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap' }}>
                <WaterDrop sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant='caption' sx={{ minWidth: '45px' }}>
                  {forecast.day.avghumidity}%
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap' }}>
                <Air sx={{ fontSize: 16, color: 'info.main' }} />
                <Typography variant='caption' sx={{ minWidth: '45px' }}>
                  {Math.round(forecast.day.maxwind_kph)}km/s
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
