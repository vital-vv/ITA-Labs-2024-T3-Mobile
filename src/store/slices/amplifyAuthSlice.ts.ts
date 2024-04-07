import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AuthStatuses} from '../../types/auth';

export type AmplifyAuthState = {
  authStatus: AuthStatuses;
  isTransitionInProgress: boolean;
};

const initialState: AmplifyAuthState = {
  authStatus: AuthStatuses.SignIn,
  isTransitionInProgress: false,
};

export const amplifyAuthSlice = createSlice({
  name: 'amplifyAuthSlice',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<AuthStatuses>) {
      state.authStatus = action.payload;
    },
    setTransitionState(state, action: PayloadAction<boolean>) {
      state.isTransitionInProgress = action.payload;
    },
  },
});

export const amplifyAuthReducer = amplifyAuthSlice.reducer;

export const amplifyAuthActions = amplifyAuthSlice.actions;
