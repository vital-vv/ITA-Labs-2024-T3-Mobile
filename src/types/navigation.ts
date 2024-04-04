import {ROUTES} from '../constants/routes';
import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParams = {
  [ROUTES.NewAds]: {headerTitle: string};
  [ROUTES.BetStack]: NavigatorScreenParams<BetStackParams>;
  [ROUTES.Delivery]: undefined;
  [ROUTES.HomeStack]: NavigatorScreenParams<HomeStackParams>;
  [ROUTES.AccountStack]: NavigatorScreenParams<AccountStackParams>;
  [ROUTES.OnBoarding]: undefined;
  [ROUTES.Auth]: undefined;
  [ROUTES.MyAdsStack]: MyAdsStackParams;
};

export type HomeStackParams = {
  [ROUTES.Home]: undefined;
  [ROUTES.SubCategory]: {id: number; headerTitle: string};
  [ROUTES.Variety]: {id: number; headerTitle: string};
  [ROUTES.LotList]: {id: number; headerTitle: string};
  [ROUTES.Lot]: {id: number; headerTitle: string};
};

export type AccountStackParams = {
  [ROUTES.Account]: undefined;
  [ROUTES.PersonalData]: undefined;
  [ROUTES.MyAdsStack]: undefined;
  [ROUTES.Notifications]: undefined;
  [ROUTES.Currency]: undefined;
  [ROUTES.Language]: undefined;
  [ROUTES.Settings]: undefined;
  [ROUTES.Password]: undefined;
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

export type MyAdsStackParams = {
  [ROUTES.MyAds]: undefined;
  [ROUTES.MyAdView]: {
    id: number;
    headerTitle: string;
    position: string;
  };
};