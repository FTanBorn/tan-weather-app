// src/components/Header.tsx
'use client'

import { AppBar, Box, IconButton, Typography, Container, Stack } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { alpha } from '@mui/material/styles'
import { useTheme } from '@/providers/ThemeProvider'
import Link from 'next/link'
import LocationSearch from '../LocationSearch'

const Header = () => {
  const { toggleTheme, mode } = useTheme()

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
              display: 'block'
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
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
