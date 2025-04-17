const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTasks = async (token: string) => {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Error al obtener las tareas');

  return res.json();
};

export const createTask = async (token: string, task: { title: string; description?: string }) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error('Error al crear tarea');

  return res.json();
};

export const updateTask = async (
  token: string,
  id: number,
  updates: { title?: string; description?: string; done?: boolean }
) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) throw new Error('Error al actualizar tarea');

  return res.json();
};

export const deleteTask = async (token: string, id: number) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Error al eliminar tarea');
};
