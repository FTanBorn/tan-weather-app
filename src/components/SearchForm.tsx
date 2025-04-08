'use client'

import { useState } from 'react'
import { 
  Paper, 
  TextField,
  InputAdornment,
  IconButton, 
  CircularProgress
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'

interface SearchFormProps {
  onSearch: (city: string) => void
  placeholder?: string
  loading?: boolean
  sx?: any
}

export default function SearchForm({ 
  onSearch, 
  placeholder = 'Şehir ara...', 
  loading = false,
  sx = {}
}: SearchFormProps) {
  const [city, setCity] = useState('')
  const theme = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper 
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          borderRadius: 3,
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
          ...sx
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : <Search />}
                </IconButton>
              </InputAdornment>
            ),
            sx: { 
              borderRadius: 2,
              backgroundColor: theme.palette.mode === 'light' 
                ? 'rgba(255, 255, 255, 0.9)' 
                : 'rgba(45, 45, 45, 0.9)',
              backdropFilter: 'blur(8px)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.1)' 
                  : 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.2)' 
                  : 'rgba(255, 255, 255, 0.2)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }
          }}
        />
      </Paper>
    </motion.div>
  )
} 