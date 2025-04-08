'use client'

import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useTheme } from '@/app/ThemeProvider'

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme()

  return (
    <Tooltip title={`${mode === 'light' ? 'Koyu' : 'Açık'} temaya geç`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label="tema değiştir"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
          '&:hover': {
            backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
          },
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}
      >
        {mode === 'light' ? (
          <DarkModeIcon />
        ) : (
          <LightModeIcon />
        )}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle 