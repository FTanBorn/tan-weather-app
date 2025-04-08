'use client'

import { Box, ThemeProvider as MuiThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ThemeToggle from '@/components/ThemeToggle'
import { useTheme } from '@/app/ThemeProvider'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            : 'linear-gradient(135deg, #1c1c1c 0%, #2d3748 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorations */}
        <Box
          sx={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: theme.palette.mode === 'light'
              ? 'radial-gradient(circle, rgba(147,112,219,0.4) 0%, rgba(138,43,226,0.1) 70%)'
              : 'radial-gradient(circle, rgba(147,112,219,0.2) 0%, rgba(138,43,226,0.05) 70%)',
            top: '-100px',
            right: '-100px',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: theme.palette.mode === 'light'
              ? 'radial-gradient(circle, rgba(64,224,208,0.4) 0%, rgba(0,206,209,0.1) 70%)'
              : 'radial-gradient(circle, rgba(64,224,208,0.2) 0%, rgba(0,206,209,0.05) 70%)',
            bottom: '-50px',
            left: '30%',
            zIndex: 0,
          }}
        />
        
        {/* Main content */}
        <Box
          component="main"
          sx={{
            position: 'relative',
            zIndex: 1,
            p: 3,
            pl: 10,
            minHeight: '100vh',
          }}
        >
          {mounted && <Sidebar />}
          {children}
        </Box>
      </Box>
      <ThemeToggle />
    </MuiThemeProvider>
  )
} 