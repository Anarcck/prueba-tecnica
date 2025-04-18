'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  Alert,
  Stack,
  Link
} from '@mui/material';
import { registerRequest } from '@/api/authApi';

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    try {
      await registerRequest(email, password, name);
      setSuccess('Registro exitoso. Redirigiendo al login...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario');
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
            Crea tu cuenta para empezar.
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
            Registro
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Nombre"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
            {success && <Alert severity="success">{success}</Alert>}

            <Button
              variant="contained"
              fullWidth
              onClick={handleRegister}
              sx={{ mt: 1 }}
            >
              Registrarse
            </Button>

            <Typography variant="body2" textAlign="center" mt={1}>
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" underline="hover">
                Inicia sesión aquí
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
