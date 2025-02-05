import { extractErrorMessage } from '@/core/shared/errors.utils';
import { usersSlice } from '@/core/store/slices/users.slice';
import { AppThunk } from '@/core/store/store';

export const fetchUsers =
  (): AppThunk<Promise<void>> =>
  async (dispatch, _, { userGateway }) => {
    dispatch(usersSlice.actions.handleUsersLoading());
    try {
      const users = await userGateway.fetchUsers();
      dispatch(usersSlice.actions.storeUsers(users));
    } catch (e) {
      dispatch(usersSlice.actions.handleUsersError(extractErrorMessage(e)));
    }
  };
