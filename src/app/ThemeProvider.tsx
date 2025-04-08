'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createTheme } from '@mui/material/styles'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
  theme: ReturnType<typeof createTheme>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const savedTheme = localStorage.getItem('theme') as ThemeMode
      if (savedTheme) {
        setMode(savedTheme)
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setMode('dark')
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
    }
  }, [])

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    try {
      localStorage.setItem('theme', newMode)
    } catch (error) {
      console.error('Error saving theme to localStorage:', error)
    }
  }

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#9c27b0' : '#ce93d8',
      },
      secondary: {
        main: mode === 'light' ? '#2196f3' : '#90caf9',
      },
      background: {
        default: mode === 'light' 
          ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' 
          : 'linear-gradient(135deg, #1c1c1c 0%, #2d3748 100%)',
        paper: mode === 'light' 
          ? 'rgba(255, 255, 255, 0.8)' 
          : 'rgba(18, 18, 18, 0.8)',
      },
    },
    typography: {
      fontFamily: inter.style.fontFamily,
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            backgroundImage: 'none',
            ...(mode === 'dark' ? {
              border: '1px solid rgba(255, 255, 255, 0.12)',
            } : {
              border: '1px solid rgba(0, 0, 0, 0.05)',
            }),
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            backgroundImage: 'none',
            ...(mode === 'dark' ? {
              background: 'rgba(30, 30, 30, 0.8)',
            } : {
              background: 'rgba(255, 255, 255, 0.8)',
            }),
          },
        },
      },
    },
  })

  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  )
} 