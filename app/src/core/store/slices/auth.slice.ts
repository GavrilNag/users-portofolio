import { UserDomainModel } from '@/core/model/user.domain-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: UserDomainModel.User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLoginLoading: (state) => {
      state.status = 'loading';
    },
    handleLoginSuccess: (
      state,
      action: PayloadAction<{ user: UserDomainModel.User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = 'success';
    },
    handleLoginError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'error';
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
