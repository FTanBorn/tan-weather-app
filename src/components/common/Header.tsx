// src/components/Header.tsx
'use client'

import { useState } from 'react'
import { AppBar, Box, IconButton, Typography, Container, Button, Stack, Paper } from '@mui/material'
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material'
import { alpha } from '@mui/material/styles'
import { useTheme } from '@/providers/ThemeProvider'
import Link from 'next/link'
import LocationSearch from '../LocationSearch'
import { Location } from '@/types/geonames'

interface Page {
  name: string
  link: string
}

const Header = () => {
  const { toggleTheme, mode } = useTheme()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: (theme: any) => alpha(theme.palette.divider, 0.1)
      }}
    >
      <Container maxWidth='xl'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2
          }}
        >
          <Stack direction={'row'} alignItems={'center'}>
            <Typography
              noWrap
              component={Link}
              href={'/'}
              sx={{
                fontWeight: 900,
                fontSize: {
                  xs: 12,
                  sm: 24
                },
                color: 'text.primary',
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                fontFamily: "'Roboto', sans-serif"
              }}
            >
              TanWeather
            </Typography>
          </Stack>

          {/* Arama kutusu */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 400,
              mx: 2,
              display: { xs: 'block', md: 'block' } // Mobile'da gizle
            }}
          >
            <LocationSearch />
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
            <IconButton onClick={toggleTheme} color='default'>
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          {/* Mobile Navigation */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <Box sx={{ position: 'relative' }}>
              <IconButton size='large' onClick={() => setShowMobileMenu(!showMobileMenu)} color='default'>
                <MenuIcon />
              </IconButton>
              {showMobileMenu && (
                <Paper
                  elevation={4}
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    mt: 1,
                    minWidth: 200,
                    borderRadius: 2,
                    overflow: 'hidden',
                    animation: 'dropdownFade 0.2s ease',
                    '@keyframes dropdownFade': {
                      from: { opacity: 0, transform: 'translateY(-10px)' },
                      to: { opacity: 1, transform: 'translateY(0)' }
                    }
                  }}
                >
                  <Box sx={{ p: 1 }}>
                    {/* Mobile'da arama kutusu */}
                    <Box sx={{ mb: 2 }}>
                      <LocationSearch />
                    </Box>
                    <Button
                      fullWidth
                      onClick={toggleTheme}
                      startIcon={mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                      sx={{
                        justifyContent: 'flex-start',
                        px: 2,
                        py: 1,
                        mt: 1,
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                    >
                      {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                  </Box>
                </Paper>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
