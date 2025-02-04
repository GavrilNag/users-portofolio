import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Dependencies } from './dependencies';
import { usersReducer } from './slices/users.slice';

const reducers = combineReducers({
  users: usersReducer,
});

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore['dispatch'];
export type AppGetState = AppStore['getState'];

export const createStore = (config: { initialState?: AppState; dependencies: Dependencies }) => {
  const store = configureStore({
    preloadedState: config?.initialState,
    reducer: reducers,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: config.dependencies,
        },
      });
    },
  });

  return store;
};

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, Dependencies, Action>;
