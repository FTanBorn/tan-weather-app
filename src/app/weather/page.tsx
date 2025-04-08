'use client'

import { useState, useEffect } from 'react'
import { 
  Box, 
  Paper, 
  Typography, 
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Chip
} from '@mui/material'
import { WbSunny, Opacity, Air, Thermostat } from '@mui/icons-material'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
import { useSearchParams } from 'next/navigation'
import { turkishToEnglish } from '@/utils/weatherUtils'
import SearchForm from '@/components/SearchForm'

// Hava durumu verilerinin tipini tanımlıyorum
interface WeatherData {
  location: {
    name: string
    region: string
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
    uv: number
  }
  forecast?: {
    forecastday: Array<{
      date: string
      day: {
        avgtemp_c: number
        condition: {
          text: string
          icon: string
        }
        maxtemp_c: number
        mintemp_c: number
        avghumidity: number
        totalprecip_mm: number
      }
      hour: Array<{
        time: string
        temp_c: number
        condition: {
          text: string
          icon: string
        }
        humidity: number
        precip_mm: number
      }>
    }>
  }
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [chartData, setChartData] = useState<any[]>([])
  const [chartType, setChartType] = useState<'temperature' | 'humidity' | 'precipitation'>('temperature')
  const theme = useTheme()
  const searchParams = useSearchParams()

  // Handle chart type change
  const handleChartTypeChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as 'temperature' | 'humidity' | 'precipitation')
  }

  // Girilen şehir için hava durumu verilerini çekiyorum
  const fetchWeather = async (searchCity: string) => {
    if (!searchCity) return
    
    setLoading(true)
    setError('')
    
    try {
      // Türkçe karakterleri İngilizce karakterlere dönüştür
      const convertedCity = turkishToEnglish(searchCity);
      
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${convertedCity}&days=3&aqi=no&alerts=no`
      )
      
      if (!response.ok) {
        throw new Error('Şehir bulunamadı veya hava durumu verisi alınamadı')
      }
      
      const data = await response.json()
      setWeather(data)
      
      // Prepare chart data
      if (data && data.forecast && data.forecast.forecastday && data.forecast.forecastday.length > 0) {
        const hourlyData = data.forecast.forecastday[0].hour.map((hour: any) => ({
          time: hour.time.split(' ')[1], // Extract time part
          temperature: hour.temp_c,
          humidity: hour.humidity,
          precipitation: hour.precip_mm
        }))
        setChartData(hourlyData)
      }
    } catch (err) {
      setError('Hava durumu bilgileri alınamadı. Lütfen geçerli bir şehir adı girin.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSearch = (searchCity: string) => {
    fetchWeather(searchCity)
  }

  // URL'den şehir parametresini al ve hava durumunu getir
  useEffect(() => {
    const cityParam = searchParams.get('city')
    if (cityParam) {
      fetchWeather(cityParam)
    } else {
      // Varsayılan olarak İstanbul'un hava durumunu göster
      fetchWeather('Istanbul')
    }
  }, [searchParams])

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <SearchForm 
        onSearch={handleSearch} 
        loading={loading} 
        sx={{ mb: 4 }}
      />
      
      {/* Hata Mesajı */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            background: theme.palette.mode === 'light' 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(30, 30, 30, 0.8)',
            backdropFilter: 'blur(10px)',
            border: theme.palette.mode === 'light'
              ? '1px solid rgba(0, 0, 0, 0.05)'
              : '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          {error}
        </Alert>
      )}

      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Mevcut Hava Durumu Kartı */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 4,
              borderRadius: 4,
              background: theme.palette.mode === 'light' 
                ? 'rgba(255, 255, 255, 0.8)' 
                : 'rgba(30, 30, 30, 0.8)',
              backdropFilter: 'blur(10px)',
              border: theme.palette.mode === 'light'
                ? '1px solid rgba(0, 0, 0, 0.05)'
                : '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: theme.palette.mode === 'light'
                ? '0 4px 20px rgba(0, 0, 0, 0.05)'
                : '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                  {weather.location.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {weather.location.region}, {weather.location.country}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(weather.location.localtime).toLocaleString()}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 2, md: 0 } }}>
                <Image 
                  src={`https:${weather.current.condition.icon}`}
                  alt={weather.current.condition.text}
                  width={64}
                  height={64}
                />
                <Typography variant="h3" sx={{ fontWeight: 700, ml: 2 }}>
                  {Math.round(weather.current.temp_c)}°C
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="h6" sx={{ mb: 2 }}>
              {weather.current.condition.text}
            </Typography>
            
            <Divider 
              sx={{ 
                my: 3, 
                opacity: theme.palette.mode === 'light' ? 0.1 : 0.2 
              }} 
            />
            
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Thermostat color="primary" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Hissedilen</Typography>
                    <Typography variant="h6">{weather.current.feelslike_c}°C</Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Opacity color="primary" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Nem</Typography>
                    <Typography variant="h6">{weather.current.humidity}%</Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Air color="primary" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Rüzgar</Typography>
                    <Typography variant="h6">{weather.current.wind_kph} km/s</Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WbSunny color="primary" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">UV İndeksi</Typography>
                    <Typography variant="h6">{weather.current.uv}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Chart Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 4,
              borderRadius: 4,
              background: theme.palette.mode === 'light' 
                ? 'rgba(255, 255, 255, 0.8)' 
                : 'rgba(30, 30, 30, 0.8)',
              backdropFilter: 'blur(10px)',
              border: theme.palette.mode === 'light'
                ? '1px solid rgba(0, 0, 0, 0.05)'
                : '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: theme.palette.mode === 'light'
                ? '0 4px 20px rgba(0, 0, 0, 0.05)'
                : '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Saatlik Veriler
              </Typography>
              
              <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel id="chart-type-label">Grafik Türü</InputLabel>
                <Select
                  labelId="chart-type-label"
                  value={chartType}
                  label="Grafik Türü"
                  onChange={handleChartTypeChange}
                >
                  <MenuItem value="temperature">Sıcaklık</MenuItem>
                  <MenuItem value="humidity">Nem</MenuItem>
                  <MenuItem value="precipitation">Yağış</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ height: 400, width: '100%' }}>
              <ResponsiveContainer>
                {chartType === 'temperature' ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="time" />
                    <YAxis unit="°C" />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#9c27b0" name="Sıcaklık (°C)" strokeWidth={2} dot={{ r: 2 }} />
                  </LineChart>
                ) : chartType === 'humidity' ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="time" />
                    <YAxis unit="%" />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="humidity" fill="#2196f3" name="Nem (%)" />
                  </BarChart>
                ) : (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="time" />
                    <YAxis unit="mm" />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="precipitation" fill="#4caf50" name="Yağış (mm)" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </Box>
          </Paper>
          
          {/* 3 Günlük Tahmin Kartları */}
          {weather.forecast && (
            <Box>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>3 Günlük Tahmin</Typography>
              <Grid container spacing={3}>
                {weather.forecast.forecastday.map((day) => (
                  <Grid item xs={12} sm={4} key={day.date}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Card
                        sx={{ 
                          height: '100%',
                          backdropFilter: 'blur(10px)',
                          background: theme.palette.mode === 'light' 
                            ? 'rgba(255, 255, 255, 0.7)' 
                            : 'rgba(30, 30, 30, 0.7)',
                          border: theme.palette.mode === 'light'
                            ? '1px solid rgba(0, 0, 0, 0.05)'
                            : '1px solid rgba(255, 255, 255, 0.12)',
                          boxShadow: theme.palette.mode === 'light'
                            ? '0 4px 20px rgba(0, 0, 0, 0.05)'
                            : '0 4px 20px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">
                              {new Date(day.date).toLocaleDateString('tr-TR', { weekday: 'long' })}
                            </Typography>
                            <Chip 
                              label={new Date(day.date).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' })}
                              size="small"
                              sx={{ 
                                borderRadius: 2,
                                backgroundColor: theme.palette.mode === 'light' 
                                  ? 'rgba(0, 0, 0, 0.05)' 
                                  : 'rgba(255, 255, 255, 0.15)',
                                color: theme.palette.mode === 'light' 
                                  ? 'rgba(0, 0, 0, 0.8)' 
                                  : 'rgba(255, 255, 255, 0.9)',
                                border: theme.palette.mode === 'light'
                                  ? '1px solid rgba(0, 0, 0, 0.05)'
                                  : '1px solid rgba(255, 255, 255, 0.12)',
                              }}
                            />
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
                            <Image 
                              src={`https:${day.day.condition.icon}`}
                              alt={day.day.condition.text}
                              width={48}
                              height={48}
                            />
                            <Typography variant="h4" sx={{ ml: 1 }}>
                              {Math.round(day.day.avgtemp_c)}°C
                            </Typography>
                          </Box>
                          
                          <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                            {day.day.condition.text}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Box>
                              <Typography variant="caption" color="text.secondary">Min</Typography>
                              <Typography variant="body1">{Math.round(day.day.mintemp_c)}°C</Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">Max</Typography>
                              <Typography variant="body1">{Math.round(day.day.maxtemp_c)}°C</Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </motion.div>
      )}
    </Box>
  )
} 