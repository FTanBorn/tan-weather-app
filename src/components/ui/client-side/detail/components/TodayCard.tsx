// components/TodayCard.tsx
import { Card, CardContent, Grid, Typography, Box, Fade } from '@mui/material'
import { WaterDrop, Air, WbSunny, NightsStay, WbTwilight } from '@mui/icons-material'
import { WeatherIcon } from './WeatherIcon'

interface TodayCardProps {
  current: {
    temp_c: number
    condition: {
      text: string
    }
    humidity: number
    wind_kph: number
    feelslike_c: number
  }
  location: {
    name: string
    country: string
  }
  forecast: {
    forecastday: [
      {
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
          }
        }>
      }
    ]
  }
}

export const TodayCard = ({ current, location, forecast }: TodayCardProps) => {
  const todayForecast = forecast.forecastday[0]

  return (
    <Fade in timeout={1000}>
      <Card
        elevation={3}
        sx={{
          mb: 4,
          background: theme =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(to right bottom, #1a237e, #0d47a1)'
              : 'linear-gradient(to right bottom, #e3f2fd, #bbdefb)',
          borderRadius: 4,
          overflow: 'hidden'
        }}
      >
        <CardContent>
          <Grid container spacing={5} p={2}>
            {/* Sol taraf - Ana bilgiler */}
            <Grid item xs={12} md={6}>
              <Typography variant='h4' gutterBottom>
                {location.name}, {location.country}
              </Typography>
              <Typography variant='h2' sx={{ mb: 2 }}>
                {Math.round(current.temp_c)}°C
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WeatherIcon condition={current.condition.text} size={120} />
                <Typography variant='h6'>{current.condition.text}</Typography>
              </Box>
              <Typography variant='body1' color='text.secondary'>
                Hissedilen: {Math.round(current.feelslike_c)}°C
              </Typography>
            </Grid>

            {/* Sağ taraf - Detaylar */}
            <Grid container item xs={12} md={6} alignItems='center' justifyContent='center'>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WbSunny sx={{ mr: 1 }} />
                  <Typography>En yüksek: {Math.round(todayForecast.day.maxtemp_c)}°C</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <NightsStay sx={{ mr: 1 }} />
                  <Typography>En düşük: {Math.round(todayForecast.day.mintemp_c)}°C</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WaterDrop sx={{ mr: 1 }} />
                  <Typography>Nem: {current.humidity}%</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Air sx={{ mr: 1 }} />
                  <Typography>Rüzgar: {Math.round(current.wind_kph)} km/s</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WbTwilight sx={{ mr: 1 }} />
                  <Typography>G.Doğumu: {todayForecast.astro.sunrise}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WbTwilight sx={{ mr: 1 }} />
                  <Typography>G.Batımı: {todayForecast.astro.sunset}</Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Saatlik tahminler */}
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                Saatlik Tahminler
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  overflowX: 'auto',
                  pb: 2,
                  '::-webkit-scrollbar': {
                    height: 8
                  },
                  '::-webkit-scrollbar-track': {
                    background: 'rgba(0,0,0,0.1)',
                    borderRadius: 4
                  },
                  '::-webkit-scrollbar-thumb': {
                    background: theme => theme.palette.primary.main,
                    borderRadius: 4
                  }
                }}
              >
                {forecast.forecastday[0].hour.map((hour, index) => (
                  <Box
                    key={index}
                    sx={{
                      minWidth: 100,
                      p: 2,
                      textAlign: 'center',
                      alignContent: 'center',
                      justifyItems: 'center',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    <Typography variant='body2'>
                      {new Date(hour.time).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    <WeatherIcon condition={hour.condition.text} size={40} />
                    <Typography variant='h6'>{Math.round(hour.temp_c)}°</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fade>
  )
}
