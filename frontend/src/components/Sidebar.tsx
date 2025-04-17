'use client';

import { List, ListItemButton, ListItemText, Drawer, Toolbar, Box, Typography, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

export const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#173e75',
          color: '#fff',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          To Do App
        </Typography>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
        <List>
          <ListItemButton onClick={() => router.push('/dashboard')}>
            <ListItemText primary="Tareas" />
          </ListItemButton>

          <ListItemButton onClick={() => router.push('/dashboard/new')}>
            <ListItemText primary="Nueva tarea" />
          </ListItemButton>

          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Cerrar sesión" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};
