import { extractErrorMessage } from '@/core/shared/errors.utils';
import { usersSlice } from '@/core/store/slices/users.slice';
import { AppThunk } from '@/core/store/store';

export const register =
  (): AppThunk<Promise<void>> =>
  async (dispatch, _, { userGateway: userRepository }) => {
    dispatch(usersSlice.actions.handleUsersLoading());
    try {
      const users = await userRepository.fetchUsers();
      dispatch(usersSlice.actions.storeUsers(users));
    } catch (e) {
      dispatch(usersSlice.actions.handleUsersError(extractErrorMessage(e)));
    }
  };
