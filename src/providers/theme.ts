// src/theme/theme.ts
import { ThemeOptions } from '@mui/material/styles'

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0284c7', // Gökyüzü mavisi
      light: '#38bdf8',
      dark: '#0369a1',
      contrastText: '#fff'
    },
    secondary: {
      main: '#f59e0b', // Güneş/gün batımı tonları
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#fff'
    },
    background: {
      default: '#f0f9ff', // Açık gökyüzü mavisi
      paper: '#ffffff'
    },
    text: {
      primary: '#0c4a6e', // Koyu okyanus mavisi
      secondary: '#64748b' // Bulut grisi
    },
    error: {
      main: '#dc2626', // Fırtına kırmızısı
      light: '#ef4444',
      dark: '#b91c1c'
    },
    warning: {
      main: '#fb923c', // Gün batımı turuncusu
      light: '#fdba74',
      dark: '#ea580c'
    },
    info: {
      main: '#0ea5e9', // Berrak gökyüzü
      light: '#38bdf8',
      dark: '#0284c7'
    },
    success: {
      main: '#10b981', // Yağmur sonrası yeşil
      light: '#34d399',
      dark: '#059669'
    },
    divider: 'rgba(14, 165, 233, 0.08)' // Hafif mavi ayırıcı
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      letterSpacing: '-0.01em'
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em'
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '0.02em'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '8px 16px',
          fontWeight: 500
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(14, 165, 233, 0.1)',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }
        }
      }
    }
  }
}

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#38bdf8', // Parlak gece mavisi
      light: '#7dd3fc',
      dark: '#0284c7',
      contrastText: '#fff'
    },
    secondary: {
      main: '#fbbf24', // Ay ışığı sarısı
      light: '#fcd34d',
      dark: '#d97706',
      contrastText: '#fff'
    },
    background: {
      default: '#020617', // Gece gökyüzü
      paper: '#0f172a' // Koyu gece mavisi
    },
    text: {
      primary: '#e0f2fe',
      secondary: '#94a3b8'
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626'
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706'
    },
    info: {
      main: '#38bdf8',
      light: '#7dd3fc',
      dark: '#0284c7'
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669'
    },
    divider: 'rgba(56, 189, 248, 0.1)', // Gece mavisi ayırıcı
    action: {
      active: '#e0f2fe',
      hover: 'rgba(56, 189, 248, 0.08)',
      selected: 'rgba(56, 189, 248, 0.12)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(56, 189, 248, 0.12)'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#e0f2fe'
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#e0f2fe'
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#e0f2fe'
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#e0f2fe'
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#e0f2fe'
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#e0f2fe'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
      color: '#e0f2fe'
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#bae6fd'
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '0.02em'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '8px 16px',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: 'rgba(56, 189, 248, 0.08)'
          }
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.8)', // Yarı saydam koyu mavi
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(56, 189, 248, 0.2)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            '& fieldset': {
              borderColor: 'rgba(56, 189, 248, 0.2)'
            },
            '&:hover fieldset': {
              borderColor: 'rgba(56, 189, 248, 0.3)'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#38bdf8'
            }
          }
        }
      }
    }
  }
}
