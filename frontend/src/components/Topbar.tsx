'use client';

import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

export const Topbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: '#fff',
        color: '#173e75',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          To Do App
        </Typography>

        <Box display="flex" alignItems="center" gap={3}>
          <Typography fontSize="0.9rem" color="text.secondary">
            reto@blindariesgos.com
          </Typography>
          <Button
            onClick={handleLogout}
            variant="outlined"
            color="primary"
            size="small"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
