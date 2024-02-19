import {ROUTES} from '../constants/routes';
import {NavigatorScreenParams, Route} from '@react-navigation/native';

export type RootStackParams = {
  [ROUTES.NewAds]: {headerTitle: string};
  [ROUTES.Bets]: {headerTitle: string};
  [ROUTES.Delivery]: {headerTitle: string};
  [ROUTES.HomeStack]: NavigatorScreenParams<HomeStackParams>;
  [ROUTES.Account]: {headerTitle: string};
  [ROUTES.OnBoarding]: undefined;
};

export type HomeStackParams = {
  [ROUTES.Home]: undefined;
  [ROUTES.SubCategory]: {subCategory: number; headerTitle: string};
  [ROUTES.LotList]: {subCategory: number; headerTitle: string};
  [ROUTES.Lot]: {id: number; headerTitle: string};
  [ROUTES.OnBoarding]: undefined;
};
