import { createSelector } from '@reduxjs/toolkit/react';
import { AppState } from '../store/store';

export const selectUsersStore = (state: AppState) => state.users;
export const selectUsersAvailableState = createSelector(
  selectUsersStore,
  (state) => state.availableUsers,
);

export const selectUsersAvailable = createSelector(
  selectUsersAvailableState,
  (usersState) => usersState.data,
);
export const selectUsersAvailableStatus = createSelector(
  selectUsersAvailableState,
  (usersState) => usersState.status,
);
