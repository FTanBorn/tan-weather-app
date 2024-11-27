// src/theme/theme.ts
import { createTheme, Theme, PaletteMode } from '@mui/material/styles'

interface CustomThemeOptions {
  isNight: boolean
}

export const createCustomTheme = ({ isNight }: CustomThemeOptions): Theme => {
  const mode: PaletteMode = isNight ? 'dark' : 'light'

  const baseTheme = {
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(8px)',
            background: isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
            transition: 'all 0.3s ease'
          }
        }
      }
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Arial", sans-serif'
    },
    palette: {
      mode,
      primary: {
        main: isNight ? '#90caf9' : '#1976d2'
      },
      background: {
        default: isNight ? '#0f2027' : '#ffffff',
        paper: isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'
      },
      text: {
        primary: isNight ? '#ffffff' : '#000000',
        secondary: isNight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'
      }
    }
  }

  return createTheme(baseTheme)
}
