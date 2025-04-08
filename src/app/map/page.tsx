'use client'

import { useState, useEffect } from 'react'
import { 
  Box, 
  Paper, 
  Typography, 
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Alert
} from '@mui/material'
import { LocationOn, Info } from '@mui/icons-material'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material/styles'
import SearchForm from '@/components/SearchForm'

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

interface GeoLocation {
  lat: number
  lon: number
  display_name: string
  address: {
    city?: string
    town?: string
    state?: string
    country?: string
    country_code?: string
    suburb?: string
    county?: string
    postcode?: string
  }
  importance?: number
}

export default function MapPage() {
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mapKey, setMapKey] = useState(Date.now())
  const theme = useTheme()

  // Harita bileşenini oluşturuyorum
  const fetchCoordinates = async (searchCity: string) => {
    if (!searchCity) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchCity)}&format=json&addressdetails=1&limit=1`
      )
      
      if (!response.ok) {
        throw new Error('Konum bilgisi alınamadı')
      }
      
      const data = await response.json()
      
      if (data && data.length > 0) {
        setLocation({
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          display_name: data[0].display_name,
          address: data[0].address,
          importance: data[0].importance
        })
        setMapKey(Date.now()) // Force map re-render
      } else {
        setError('Şehir bulunamadı. Lütfen geçerli bir şehir adı girin.')
      }
    } catch (err) {
      setError('Konum bilgisi alınamadı. Lütfen daha sonra tekrar deneyin.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSearch = (searchCity: string) => {
    fetchCoordinates(searchCity)
  }

  // Sayfa yüklendiğinde varsayılan olarak İstanbul'u gösteriyorum
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

    fetchCoordinates('Istanbul')
  }, [])

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

      <Grid container spacing={4}>
        {/* Harita */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Paper
              elevation={0}
              sx={{ 
                borderRadius: 4,
                overflow: 'hidden',
                height: 500,
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
              {location && typeof window !== 'undefined' && (
                <MapContainer 
                  center={[location.lat, location.lon]} 
                  zoom={10} 
                  style={{ height: '100%', width: '100%' }}
                  key={mapKey}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[location.lat, location.lon]}>
                    <Popup>
                      {location.display_name}
                    </Popup>
                  </Marker>
                </MapContainer>
              )}
            </Paper>
          </motion.div>
        </Grid>
        
        {/* Location Info */}
        <Grid item xs={12} md={4}>
          {location && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card
                sx={{ 
                  borderRadius: 4,
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
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn color="error" sx={{ mr: 1, fontSize: 28 }} />
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: theme.palette.mode === 'light' 
                          ? 'text.primary' 
                          : 'text.primary',
                        fontWeight: 600 
                      }}
                    >
                      {location.address.city || location.address.town || location.address.county || ''}
                    </Typography>
                  </Box>
                  
                  <Divider 
                    sx={{ 
                      mb: 2, 
                      opacity: theme.palette.mode === 'light' ? 0.1 : 0.2 
                    }} 
                  />
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {location.display_name}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Konum Bilgileri</Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Ülke:</Typography>
                      <Typography variant="body2">{location.address.country || 'Bilinmiyor'}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Eyalet/Bölge:</Typography>
                      <Typography variant="body2">{location.address.state || 'Bilinmiyor'}</Typography>
                    </Box>
                    
                    {location.address.county && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">İlçe:</Typography>
                        <Typography variant="body2">{location.address.county}</Typography>
                      </Box>
                    )}
                    
                    {location.address.postcode && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">Posta Kodu:</Typography>
                        <Typography variant="body2">{location.address.postcode}</Typography>
                      </Box>
                    )}
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Koordinatlar</Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Enlem:</Typography>
                      <Typography variant="body2">{location.lat.toFixed(6)}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Boylam:</Typography>
                      <Typography variant="body2">{location.lon.toFixed(6)}</Typography>
                    </Box>
                  </Box>
                  
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    startIcon={<Info />}
                    href={`https://www.openstreetmap.org/#map=13/${location.lat}/${location.lon}`}
                    target="_blank"
                    sx={{ 
                      mt: 2, 
                      borderRadius: 2,
                      textTransform: 'none',
                      borderColor: theme.palette.mode === 'light'
                        ? 'rgba(33, 150, 243, 0.5)'
                        : 'rgba(144, 202, 249, 0.5)',
                      color: theme.palette.mode === 'light'
                        ? theme.palette.primary.main
                        : theme.palette.primary.light,
                      '&:hover': {
                        borderColor: theme.palette.mode === 'light'
                          ? theme.palette.primary.main
                          : theme.palette.primary.light,
                        background: theme.palette.mode === 'light'
                          ? 'rgba(33, 150, 243, 0.08)'
                          : 'rgba(144, 202, 249, 0.08)',
                      }
                    }}
                  >
                    Daha Fazla Bilgi
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </Grid>
      </Grid>
    </Box>
  )
} 