import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type CurrentUserStateType = {
  isLogged: boolean;
  email: string;
  phone: string;
  role: string;
  name: string;
};

const initialState: CurrentUserStateType = {
  isLogged: false,
  email: '',
  role: '',
  phone: '',
  name: '',
};

export const currentUserSlice = createSlice({
  name: 'currentUserSlice',
  initialState,
  reducers: {
    isLoggedIn(
      state,
      action: PayloadAction<Omit<CurrentUserStateType, 'isLogged'>>,
    ) {
      state.isLogged = true;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
    },
    isLogout: () => initialState,
  },
});

export const currentUserReducer = currentUserSlice.reducer;

export const currentUserActions = currentUserSlice.actions;
