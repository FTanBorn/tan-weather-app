// src/components/LoadingScreen.tsx
import { Box, CircularProgress } from '@mui/material'

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme => (theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'),
        zIndex: 9999
      }}
    >
      <CircularProgress />
    </Box>
  )
}
