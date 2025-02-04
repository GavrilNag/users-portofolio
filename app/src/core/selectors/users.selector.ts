import { createSelector } from '@reduxjs/toolkit/react';
import { AppState } from '../store/store';

export const selectUsersStore = (state: AppState) => state.users;
export const selectUsersAvailable = createSelector(
  selectUsersStore,
  (state) => state.availableUsers.data,
);
