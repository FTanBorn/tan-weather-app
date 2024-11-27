// src/components/weather/TodayCard.tsx
import { Card, CardContent, Typography, Box, Grid, useTheme } from '@mui/material'
import { WaterDrop, Air, WbTwilight } from '@mui/icons-material'
import { WeatherIcon } from './WeatherIcon'
import { getWeatherCardStyles } from '@/utils/weatherStyles'
import { isLocationNightTime } from '@/utils/weatherUtils'

interface TodayCardProps {
  current: {
    temp_c: number
    feelslike_c: number
    condition: {
      text: string
      icon: string
    }
    humidity: number
    wind_kph: number
  }
  location: {
    name: string
    country: string
    localtime: string
  }
  forecast: {
    forecastday: Array<{
      day: {
        maxtemp_c: number
        mintemp_c: number
      }
      astro: {
        sunrise: string
        sunset: string
      }
    }>
  }
}

export const TodayCard = ({ current, location, forecast }: TodayCardProps) => {
  const theme = useTheme()
  const isNight = isLocationNightTime(location.localtime)
  const cardStyles = getWeatherCardStyles(isNight)
  const todayForecast = forecast.forecastday[0]

  return (
    <Card
      sx={{
        ...cardStyles.card,
        position: 'relative',
        overflow: 'hidden',
        p: 4
      }}
    >
      <Box sx={cardStyles.gradientOverlay} />
      <CardContent sx={{ position: 'relative', zIndex: 1, p: 0 }}>
        <Grid container spacing={3}>
          {/* Sol Taraf */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography
                variant='h4'
                sx={{
                  color: theme.palette.text.primary,
                  mb: 4
                }}
              >
                {location.name}, {location.country}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  mb: 3
                }}
              >
                <Typography
                  variant='h1'
                  sx={{
                    fontSize: { xs: '4rem', md: '6rem' },
                    fontWeight: 700,
                    lineHeight: 1,
                    color: theme.palette.text.primary
                  }}
                >
                  {Math.round(current.temp_c)}°
                </Typography>
                <WeatherIcon condition={current.condition.text} isNight={isNight} size={80} />
              </Box>

              <Box>
                <Typography
                  variant='h5'
                  sx={{
                    color: theme.palette.text.primary,
                    mb: 1
                  }}
                >
                  {current.condition.text}
                </Typography>
                <Typography variant='h6' sx={{ color: theme.palette.text.secondary }}>
                  Hissedilen: {Math.round(current.feelslike_c)}°
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Sağ Taraf */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: isNight ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.05)',
                borderRadius: 10,
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}
            >
              {/* Sıcaklık Aralığı */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.error.main,
                      fontSize: '1.5rem'
                    }}
                  >
                    ↑
                  </Typography>
                  <Typography variant='h5'>{Math.round(todayForecast.day.maxtemp_c)}°</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.info.main,
                      fontSize: '1.5rem'
                    }}
                  >
                    ↓
                  </Typography>
                  <Typography variant='h5'>{Math.round(todayForecast.day.mintemp_c)}°</Typography>
                </Box>
              </Box>

              {/* Nem ve Rüzgar */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <WaterDrop
                    sx={{
                      color: theme.palette.info.main,
                      fontSize: '2rem'
                    }}
                  />
                  <Box>
                    <Typography variant='body2' color='text.secondary'>
                      Nem
                    </Typography>
                    <Typography variant='h6'>{current.humidity}%</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Air
                    sx={{
                      color: theme.palette.info.light,
                      fontSize: '2rem'
                    }}
                  />
                  <Box>
                    <Typography variant='body2' color='text.secondary'>
                      Rüzgar
                    </Typography>
                    <Typography variant='h6'>{Math.round(current.wind_kph)} km/s</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Güneş */}
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <WbTwilight
                      sx={{
                        color: theme.palette.warning.light,
                        fontSize: '2rem'
                      }}
                    />
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Gün Doğumu
                      </Typography>
                      <Typography variant='h6'>{todayForecast.astro.sunrise}</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <WbTwilight
                      sx={{
                        color: theme.palette.warning.main,
                        fontSize: '2rem'
                      }}
                    />
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Gün Batımı
                      </Typography>
                      <Typography variant='h6'>{todayForecast.astro.sunset}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
