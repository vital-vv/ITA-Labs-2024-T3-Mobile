import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Currency, UserRoles} from '../../types/api/info';
import {CurrentUserResponse} from '../../types/api/users';

export type CurrentUserStateType = {
  isOnboarded: boolean;
  isLoggedIn: boolean;
  isInitializing: boolean;
  email: string;
  phone: string;
  role: UserRoles | '';
  name: string;
  surname: string;
  avatarId: string;
  currency: Currency;
  photo: string;
  userId: string;
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
  avatarId: '',
  userId: '',
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
          CurrentUserResponse,
          'isLoggedIn' | 'isInitializing' | 'isOnboarded'
        >
      >,
    ) {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.name = action.payload.first_name;
      state.phone = action.payload.phoneNumber;
      state.surname = action.payload.last_name;
      state.avatarId = action.payload.avatarId;
      state.currency = action.payload.preferred_currency;
      state.userId = action.payload.user_id;
    },
    setCurrentUserAvatarURL(state, action: PayloadAction<string>) {
      state.photo = action.payload;
    },
    isLogout: state => {
      return {...initialState, isInitializing: false};
    },
  },
});

export const currentUserReducer = currentUserSlice.reducer;

export const currentUserActions = currentUserSlice.actions;
