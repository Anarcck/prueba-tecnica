'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { useRouter } from 'next/navigation';
import { fetchTasks, removeTask, updateExistingTask } from '@/store/slices/taskSlice';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Checkbox,
  Stack,
  Box,
  CircularProgress
} from '@mui/material';

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const { token, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLoading) return;
    if (!token) {
      router.push('/login');
    } else {
      dispatch(fetchTasks(token));
    }
  }, [dispatch, token, isLoading, router]);

  const handleDelete = (id: number) => {
    if (token) {
      dispatch(removeTask({ token, id }));
    }
  };

  const toggleDone = (id: number, done: boolean) => {
    if (token) {
      dispatch(updateExistingTask({ token, id, updates: { done: !done } }));
    }
  };

  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Tus Tareas
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push('/dashboard/new')}
        >
          + Nueva tarea
        </Button>
      </Stack>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Stack spacing={2}>
        {tasks.map((task) => (
          <Card key={task.id} variant="outlined">
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Checkbox
                  checked={task.done}
                  onChange={() => toggleDone(task.id, task.done)}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      cursor: 'pointer',
                      textDecoration: task.done ? 'line-through' : 'none',
                      color: task.done ? 'text.secondary' : 'primary.main'
                    }}
                    onClick={() => router.push(`/dashboard/edit/${task.id}`)}
                  >
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {task.description}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(task.id)}
              >
                Eliminar
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default DashboardPage;
