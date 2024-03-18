import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type CurrentUserStateType = {
  isOnboarded: boolean;
  isLogged: boolean;
  email: string;
  phone: string;
  role: string;
  name: string;
  surname: string;
  photo: string;
  preferred_currency: string;
};

const initialState: CurrentUserStateType = {
  isLogged: false,
  isOnboarded: true,
  email: '',
  role: '',
  phone: '',
  name: '',
  surname: '',
  photo:
    '',
  preferred_currency: 'USD',
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
      state.surname = action.payload.surname;
      state.phone = action.payload.phone;
      state.photo = action.payload.photo;
      state.preferred_currency = action.payload.preferred_currency;
    },
    isLogout: () => initialState,
  },
});

export const currentUserReducer = currentUserSlice.reducer;

export const currentUserActions = currentUserSlice.actions;
