const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginRequest = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');

  return data.accessToken;
};

export const registerRequest = async (email: string, password: string, name: string) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Error al registrar');

  return data;
};
