import {ROUTES} from '../constants/routes';
import {NavigatorScreenParams, Route} from '@react-navigation/native';
import {CurrentUserStateType} from '../store/slices/currentUserSlice';

export type RootStackParams = {
  [ROUTES.NewAds]: {headerTitle: string};
  [ROUTES.Bets]: {headerTitle: string};
  [ROUTES.Delivery]: {headerTitle: string};
  [ROUTES.HomeStack]: NavigatorScreenParams<HomeStackParams>;
  [ROUTES.AccountStack]: {headerTitle: string};
  [ROUTES.OnBoarding]: undefined;
};

export type HomeStackParams = {
  [ROUTES.Home]: undefined;
  [ROUTES.SubCategory]: {subCategory: number; headerTitle: string};
  [ROUTES.LotList]: {subCategory: number; headerTitle: string};
  [ROUTES.Lot]: {id: number; headerTitle: string};
  [ROUTES.OnBoarding]: undefined;
};

export type AccountStackParams = {
  [ROUTES.Account]: undefined;
  [ROUTES.PersonalData]: {user: CurrentUserStateType; headerTitle: string};
  [ROUTES.MyAds]: {headerTitle: string};
  [ROUTES.Notifications]: {headerTitle: string};
  [ROUTES.Currency]: {user: CurrentUserStateType; headerTitle: string};
  [ROUTES.Language]: {user: CurrentUserStateType; headerTitle: string};
  [ROUTES.Settings]: {headerTitle: string};
  [ROUTES.Password]: {headerTitle: string};
};
