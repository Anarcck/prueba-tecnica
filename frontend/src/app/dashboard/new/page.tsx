'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { createNewTask } from '@/store/slices/taskSlice';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Stack
} from '@mui/material';

const NewTaskPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!title.trim()) return setError('El título es obligatorio');
    if (!token) return setError('Token inválido');

    try {
      await dispatch(createNewTask({ token, task: { title, description } }));
      router.push('/dashboard');
    } catch (err) {
      setError('Error al crear tarea');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Nueva tarea
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={3}>
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ alignSelf: 'flex-start' }}
        >
          Crear tarea
        </Button>
      </Stack>
    </Container>
  );
};

export default NewTaskPage;
