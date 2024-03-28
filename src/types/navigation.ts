import {ROUTES} from '../constants/routes';
import {NavigatorScreenParams, Route} from '@react-navigation/native';
import {CurrentUserStateType} from '../store/slices/currentUserSlice';

export type RootStackParams = {
  [ROUTES.NewAds]: {headerTitle: string};
  [ROUTES.BetStack]: NavigatorScreenParams<BetStackParams>;
  [ROUTES.Delivery]: {headerTitle: string};
  [ROUTES.HomeStack]: NavigatorScreenParams<HomeStackParams>;
  [ROUTES.AccountStack]: NavigatorScreenParams<AccountStackParams>;
  [ROUTES.OnBoarding]: undefined;
  [ROUTES.Auth]: undefined;
};

export type HomeStackParams = {
  [ROUTES.Home]: undefined;
  [ROUTES.SubCategory]: {subCategory: number; headerTitle: string};
  [ROUTES.LotList]: {subCategory: number; headerTitle: string};
  [ROUTES.Lot]: {id: number; headerTitle: string};
};

export type AccountStackParams = {
  [ROUTES.HomeStack]: NavigatorScreenParams<HomeStackParams>;
  [ROUTES.Account]: undefined;
  [ROUTES.PersonalData]: {headerTitle: string};
  [ROUTES.MyAds]: {headerTitle: string};
  [ROUTES.Notifications]: {headerTitle: string};
  [ROUTES.Currency]: {headerTitle: string};
  [ROUTES.Language]: {headerTitle: string};
  [ROUTES.Settings]: {headerTitle: string};
  [ROUTES.Password]: {headerTitle: string};
  [ROUTES.GuestAccount]: undefined;
};

export type BetStackParams = {
  [ROUTES.Bets]: undefined;
  [ROUTES.BetView]: {
    id: number;
    headerTitle: string;
    position?: 'leading' | 'outbid';
  };
};
