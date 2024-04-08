import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {currentUserReducer} from './slices/currentUserSlice';
import {agroexAPI} from '../api/index';
import {amplifyAuthReducer} from './slices/amplifyAuthSlice.ts';
import {filterOptionsReducer} from './slices/filterOptionsSlice.ts';

const rootReducer = combineReducers({
  currentUserReducer,
  amplifyAuthReducer,
  filterOptionsReducer,
  [agroexAPI.reducerPath]: agroexAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(agroexAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];
