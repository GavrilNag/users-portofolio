import { UserDomainModel } from '@/core/model/user.domain-model';
import { extractErrorMessage } from '@/core/shared/errors.utils';
import { usersSlice } from '@/core/store/slices/users.slice';
import { AppThunk } from '@/core/store/store';

export const registerNewUser =
  (payload: Omit<UserDomainModel.User, 'id'>): AppThunk<Promise<void>> =>
  async (dispatch, _, { userGateway }) => {
    dispatch(usersSlice.actions.handleRegisterNewUserLoading());
    try {
      await userGateway.registerUser(payload);
      dispatch(usersSlice.actions.handleRegisterNewUserSuccess());
    } catch (error) {
      dispatch(usersSlice.actions.handleRegisterNewUserError(extractErrorMessage(error)));
    }
  };
