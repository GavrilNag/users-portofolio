import { UserDomainModel } from '@/core/model/user.domain-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: UserDomainModel.User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: UserDomainModel.User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
