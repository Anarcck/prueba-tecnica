import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: true, // <-- importante
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    loadToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    finishLoading(state) {
      state.isLoading = false;
    }
  },
});

export const { login, logout, loadToken, finishLoading } = authSlice.actions;
export default authSlice.reducer;
