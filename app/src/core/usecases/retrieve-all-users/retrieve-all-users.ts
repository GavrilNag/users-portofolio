import { extractErrorMessage } from '@/core/shared/errors.utils';
import { usersSlice } from '@/core/store/slices/users.slice';
import { AppThunk } from '@/core/store/store';

export const fetchUsers =
  (): AppThunk<Promise<void>> =>
  async (dispatch, _, { userRepository }) => {
    dispatch(usersSlice.actions.handleUsersLoading());
    try {
      const users = await userRepository.fetchUsers();
      dispatch(usersSlice.actions.storeUsers(users.map((user) => user)));
    } catch (e) {
      dispatch(usersSlice.actions.handleUsersError(extractErrorMessage(e)));
    }
  };
