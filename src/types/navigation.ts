import {ROUTES} from '../constants/routes';

export type RootStackParams = {
  [ROUTES.NewAds]: {headerTitle: string};
  [ROUTES.Bets]: {headerTitle: string};
  [ROUTES.Delivery]: {headerTitle: string};
  [ROUTES.HomeStack]: {headerTitle: string};
  [ROUTES.Account]: {headerTitle: string};
  [ROUTES.Home]: undefined;
  [ROUTES.SubCategory]: {subCategory: number; headerTitle: string};
  [ROUTES.LotList]: {subCategory: number; headerTitle: string};
  [ROUTES.Lot]: {id: number; headerTitle: string};
};

export type HomeStackParams = {
  [ROUTES.Home]: undefined;
  [ROUTES.SubCategory]: {subCategory: number; headerTitle: string};
  [ROUTES.LotList]: {subCategory: number; headerTitle: string};
  [ROUTES.Lot]: {id: number; headerTitle: string};
};

export type NewAdsStackParams = {
  [ROUTES.NewAds]: {headerTitle: string};
  [ROUTES.Lot]: {id: number; headerTitle: string};
};
