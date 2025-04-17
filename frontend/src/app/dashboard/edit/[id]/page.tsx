'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { updateExistingTask, fetchTasks } from '@/store/slices/taskSlice';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  Stack
} from '@mui/material';

const EditTaskPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { token } = useSelector((state: RootState) => state.auth);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const task = tasks.find((t) => t.id === parseInt(id));

  useEffect(() => {
    if (!task && token) {
      dispatch(fetchTasks(token));
    } else if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task, token, dispatch]);

  const handleUpdate = async () => {
    if (!title.trim()) return setError('El título es obligatorio');
    if (!token) return setError('Token inválido');

    await dispatch(
      updateExistingTask({
        token,
        id: Number(id),
        updates: { title, description },
      })
    );

    router.push('/dashboard');
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Editar tarea
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
          onClick={handleUpdate}
          sx={{ alignSelf: 'flex-start' }}
        >
          Guardar cambios
        </Button>
      </Stack>
    </Container>
  );
};

export default EditTaskPage;
