'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Container, Box, Paper, Alert, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { login } from '@/store/slices/authSlice';
import { loginRequest } from '@/api/authApi';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const token = await loginRequest(email, password);
      dispatch(login(token));
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f6f8',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box mb={3} textAlign="center">
          <Typography variant="h3" fontWeight="bold" color="primary">
            📝 To Do App
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Organiza tu día como un pro.
          </Typography>
        </Box>
  
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
            Iniciar Sesión
          </Typography>
  
          <Stack spacing={2}>
            <TextField
              label="Correo"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
  
            {error && <Alert severity="error">{error}</Alert>}
  
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{ mt: 1 }}
            >
              Entrar
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
  
};

export default LoginPage;
