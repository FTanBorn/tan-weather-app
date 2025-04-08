'use client'

import { Box, IconButton, Paper, Tooltip } from '@mui/material';
import { Map, Cloud, Home } from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const menuItems = [
    { text: 'Ana Sayfa', icon: <Home />, path: '/', color: '#3498db' },
    { text: 'Hava Durumu', icon: <Cloud />, path: '/weather', color: '#9b59b6' },
    { text: 'Şehir Haritası', icon: <Map />, path: '/map', color: '#2ecc71' },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 16,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 8px',
        gap: 1.5,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        zIndex: 100,
      }}
    >
      {menuItems.map((item) => {
        const isActive = pathname === item.path;
        const isHovered = hovered === item.text;
        
        return (
          <Tooltip key={item.text} title={item.text} placement="right">
            <IconButton
              onClick={() => router.push(item.path)}
              onMouseEnter={() => setHovered(item.text)}
              onMouseLeave={() => setHovered(null)}
              sx={{
                backgroundColor: isActive || isHovered ? `${item.color}20` : 'transparent',
                color: isActive ? item.color : isHovered ? item.color : '#666',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                position: 'relative',
                width: 45,
                height: 45,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {item.icon}
              {isActive && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: -8,
                    width: 4,
                    height: '70%',
                    backgroundColor: item.color,
                    borderRadius: 4,
                  }}
                />
              )}
            </IconButton>
          </Tooltip>
        );
      })}
    </Paper>
  );
};

export default Sidebar; 