import { createTask, deleteTask, getTasks, updateTask } from '@/api/taskApi';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (token: string, thunkAPI) => {
    return await getTasks(token);
  }
);

export const createNewTask = createAsyncThunk(
  'tasks/createTask',
  async ({ token, task }: { token: string; task: { title: string; description?: string } }) => {
    return await createTask(token, task);
  }
);

export const updateExistingTask = createAsyncThunk(
  'tasks/updateTask',
  async ({
    token,
    id,
    updates,
  }: {
    token: string;
    id: number;
    updates: { title?: string; description?: string; done?: boolean };
  }) => {
    return await updateTask(token, id, updates);
  }
);

export const removeTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ token, id }: { token: string; id: number }) => {
    await deleteTask(token, id);
    return id;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Error al cargar tareas';
      })
      .addCase(createNewTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateExistingTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(removeTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export const { clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
