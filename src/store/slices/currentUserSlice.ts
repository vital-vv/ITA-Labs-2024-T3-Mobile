import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Currency, UserRoles} from '../../types/api/info';

export type CurrentUserStateType = {
  isOnboarded: boolean;
  isLoggedIn: boolean;
  isInitializing: boolean;
  email: string;
  phone: string;
  role: UserRoles | '';
  name: string;
  surname: string;
  photo: string;
  currency: Currency;
};

const initialState: CurrentUserStateType = {
  isLoggedIn: false,
  isOnboarded: false,
  isInitializing: true,
  email: '',
  role: '',
  phone: '',
  name: '',
  surname: '',
  photo: '',
  currency: Currency.USD,
};

export const currentUserSlice = createSlice({
  name: 'currentUserSlice',
  initialState,
  reducers: {
    setCurrentUserAsGuest(state) {
      state.isOnboarded = false;
      state.isLoggedIn = false;
      state.isInitializing = false;
    },
    setCurrentUserAsLogedIn(state) {
      state.isOnboarded = true;
      state.isLoggedIn = true;
      state.isInitializing = false;
    },
    setCurrentUserAsLogedInAndNotOnboarded(state) {
      state.isOnboarded = false;
      state.isLoggedIn = true;
      state.isInitializing = false;
    },
    setCurrentUserInfo(
      state,
      action: PayloadAction<
        Omit<
          CurrentUserStateType,
          'isLoggedIn' | 'isInitializing' | 'isOnboarded'
        >
      >,
    ) {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.surname = action.payload.surname;
      state.photo = action.payload.photo;
      state.currency = action.payload.currency;
    },

    isLogout: state => {
      return {...initialState, isInitializing: false};
    },
  },
});

export const currentUserReducer = currentUserSlice.reducer;

export const currentUserActions = currentUserSlice.actions;
