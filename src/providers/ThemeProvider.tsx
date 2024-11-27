'use client'

import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material'
import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { darkTheme, lightTheme } from './theme'

type ThemeContextType = {
  toggleTheme: () => void
  mode: 'light' | 'dark'
}

const THEME_MODE_KEY = 'themeMode'

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: 'dark'
})

export const useTheme = () => useContext(ThemeContext)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with default value
  const [mode, setMode] = useState<'light' | 'dark'>('dark')

  // Move localStorage logic to useEffect
  useEffect(() => {
    const storedMode = localStorage.getItem(THEME_MODE_KEY) as 'light' | 'dark' | null
    if (storedMode) {
      setMode(storedMode)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dataset.theme = mode
      localStorage.setItem(THEME_MODE_KEY, mode)
    }
  }, [mode])

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(() => createTheme(mode === 'light' ? lightTheme : darkTheme), [mode])

  const value = useMemo(
    () => ({
      toggleTheme,
      mode
    }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}
