import { extractErrorMessage } from '@/core/shared/errors.utils';
import { authActions } from '@/core/store/slices/auth.slice';
import { AppThunk } from '@/core/store/store';

export const authenticate =
  (payload: { email: string; password: string }): AppThunk<Promise<void>> =>
  async (dispatch, _, { userGateway }) => {
    dispatch(authActions.handleLoginLoading());
    try {
      const response = await userGateway.authenticate(payload.email, payload.password);
      dispatch(authActions.handleLoginSuccess(response));
    } catch (error) {
      dispatch(authActions.handleLoginError(extractErrorMessage(error)));
    }
  };
