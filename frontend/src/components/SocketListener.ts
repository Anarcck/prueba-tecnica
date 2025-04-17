'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import socket from '@/lib/socket';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '@/store/slices/taskSlice';
import { RootState, AppDispatch } from '@/store';

const SocketListener = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) return;
    console.log('🔌 Connecting to Socket.IO...');
    socket.connect();

    socket.on('taskCreated', (task) => {
      console.log('✅ Conectado al servidor de WebSocket');
      toast.success(`🆕 Tarea creada: ${task.title}`);
      dispatch(fetchTasks(token));
    });

    socket.on('taskUpdated', (task) => {
      toast(`✏️ Tarea actualizada: ${task.title}`);
      dispatch(fetchTasks(token));
    });

    socket.on('taskDeleted', (taskId) => {
      toast.error(`🗑️ Tarea eliminada (ID ${taskId})`);
      dispatch(fetchTasks(token));
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
      socket.disconnect();
    };
  }, [token, dispatch]);

  return null;
};

export default SocketListener;
