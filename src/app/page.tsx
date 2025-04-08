'use client'

import { Typography, Paper, Box, Button, Card, CardContent, Container, Grid, useTheme } from '@mui/material';
import { Cloud, Map, Navigation, WbSunny, Opacity, Air } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SearchForm from '@/components/SearchForm';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet components
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const features = [
    { 
      title: 'Hava Durumu', 
      icon: <Cloud sx={{ fontSize: 40, color: '#9b59b6' }} />, 
      description: 'Seçtiğiniz şehrin güncel hava durumu bilgilerini ve saatlik tahminleri görüntüleyin.',
      path: '/weather',
      color: '#9b59b6',
    },
    { 
      title: 'Şehir Haritası', 
      icon: <Map sx={{ fontSize: 40, color: '#2ecc71' }} />, 
      description: 'Seçtiğiniz şehrin konumunu harita üzerinde görüntüleyin ve çevresindeki hava durumunu keşfedin.',
      path: '/map',
      color: '#2ecc71',
    },
  ];

  // Fetch default weather data for Istanbul
  useEffect(() => {
    // Add Leaflet CSS
    if (typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
      link.crossOrigin = ''
      document.head.appendChild(link)
    }

    const fetchWeather = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Istanbul&days=1&aqi=no&alerts=no`
        );
        
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSearch = (searchCity: string) => {
    if (searchCity.trim()) {
      router.push(`/weather?city=${encodeURIComponent(searchCity)}`)
    }
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: theme.palette.mode === 'light' 
        ? 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)' 
        : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      pt: 4,
      pb: 8,
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                mb: 2,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Tan Weather App
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Hava durumu bilgilerini anlık olarak takip edin
            </Typography>
            <SearchForm 
              onSearch={handleSearch} 
              loading={false}
              sx={{ 
                maxWidth: 600,
                mx: 'auto',
                mb: 4,
              }}
            />
          </Box>
        </motion.div>

        {/* Current Weather Section */}
        {!loading && weatherData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
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
                mb: 6,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  height: '5px', 
                  width: '100%', 
                  background: 'linear-gradient(90deg, #3498db, #9b59b6)' 
                }} 
              />
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      {weatherData.location.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', ml: 1 }}>
                      {weatherData.location.country}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {new Date(weatherData.location.localtime).toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h1" sx={{ fontWeight: 700, mr: 2, color: 'text.primary' }}>
                      {Math.round(weatherData.current.temp_c)}°
                    </Typography>
                    <Box>
                      <Typography variant="h6" sx={{ color: 'text.primary' }}>
                        {weatherData.current.condition.text}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Hissedilen: {Math.round(weatherData.current.feelslike_c)}°
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        background: theme.palette.mode === 'light' 
                          ? 'rgba(155, 89, 182, 0.1)' 
                          : 'rgba(155, 89, 182, 0.2)',
                      }}>
                        <Opacity sx={{ color: '#9b59b6', mb: 1 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Nem</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {weatherData.current.humidity}%
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        background: theme.palette.mode === 'light' 
                          ? 'rgba(46, 204, 113, 0.1)' 
                          : 'rgba(46, 204, 113, 0.2)',
                      }}>
                        <Air sx={{ color: '#2ecc71', mb: 1 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Rüzgar</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {weatherData.current.wind_kph} km/s
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        background: theme.palette.mode === 'light' 
                          ? 'rgba(52, 152, 219, 0.1)' 
                          : 'rgba(52, 152, 219, 0.2)',
                      }}>
                        <WbSunny sx={{ color: '#3498db', mb: 1 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>UV</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {weatherData.current.uv}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        )}

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Paper
            elevation={0}
            sx={{ 
              borderRadius: 4,
              overflow: 'hidden',
              height: 400,
              mb: 6,
              backdropFilter: 'blur(10px)',
              background: theme.palette.mode === 'light' 
                ? 'rgba(255, 255, 255, 0.8)' 
                : 'rgba(30, 30, 30, 0.8)',
              border: theme.palette.mode === 'light'
                ? '1px solid rgba(0, 0, 0, 0.05)'
                : '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: theme.palette.mode === 'light'
                ? '0 4px 20px rgba(0, 0, 0, 0.05)'
                : '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            {typeof window !== 'undefined' && (
              <MapContainer 
                center={[41.0082, 28.9784]} // İstanbul'un koordinatları
                zoom={10} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[41.0082, 28.9784]}>
                  <Popup>
                    İstanbul
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </Paper>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700, 
              mb: 3,
              color: 'text.primary',
            }}
          >
            Özellikler
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: 4,
                    background: theme.palette.mode === 'light' 
                      ? 'rgba(255, 255, 255, 0.7)' 
                      : 'rgba(30, 30, 30, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: theme.palette.mode === 'light'
                      ? '1px solid rgba(0, 0, 0, 0.05)'
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: theme.palette.mode === 'light'
                      ? '0 4px 20px rgba(0, 0, 0, 0.05)'
                      : '0 4px 20px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 12px 20px ${feature.color}20`,
                    },
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      height: '5px', 
                      width: '100%', 
                      background: feature.color 
                    }} 
                  />
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <Box sx={{ mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        {feature.description}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        endIcon={<Navigation />}
                        onClick={() => router.push(feature.path)}
                        sx={{
                          borderRadius: 2,
                          borderColor: feature.color,
                          color: feature.color,
                          '&:hover': {
                            backgroundColor: `${feature.color}10`,
                            borderColor: feature.color,
                          },
                          mt: 'auto',
                        }}
                      >
                        Keşfet
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
