import { UserDomainModel } from '@/core/model/user.domain-model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState: UserDomainModel.State = {
  registerNewUser: {
    status: 'idle',
    error: null,
  },
  availableUsers: {
    status: 'idle',
    error: null,
    data: [],
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    handleRegisterNewUserLoading: (state) => {
      state.registerNewUser.status = 'loading';
    },
    handleRegisterNewUserSuccess: (state) => {
      state.registerNewUser.status = 'success';
    },
    handleRegisterNewUserError: (state, action: PayloadAction<string>) => {
      state.registerNewUser.status = 'error';
      state.registerNewUser.error = action.payload;
    },
    storeUsers: (state, action: PayloadAction<UserDomainModel.User[]>) => {
      state.availableUsers.data = action.payload;
      state.availableUsers.status = 'success';
    },
    handleUsersLoading: (state) => {
      state.availableUsers.status = 'loading';
    },
    handleUsersError: (state, action: PayloadAction<string>) => {
      state.availableUsers.error = action.payload;
      state.availableUsers.status = 'error';
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;
