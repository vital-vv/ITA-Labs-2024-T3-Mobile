import {StatusInResponce} from "../types/api/info";

const API_BASE_URL = process.env.API_BASE_URL;

export const API_URL = {
  baseURL: `${API_BASE_URL}`,
  categories: '/categories',
  category: (id: number) => `/categories/${id}`,
  lotsInSubCategory: (
    id: number,
    page: number = 1,
    limit: number = 10,
    filterArgs: string = '',
  ) => `categories/${id}/lots?page=${page}&limit=${limit}${filterArgs}`,
  lot: (id: number) => `/lots/${id}`,
  dataSelection: '/data-selection',
  cities: (country: string) => `/data-selection/${country}/cities`,
  lots: '/lots',
  lotBuy: (id: number) => `/lots/${id}/buy`,
  lotConfirm: (id: number) => `/lots/${id}/confirm`,
  lotDeactivate: (id: number) => `/lots/${id}/deactivate`,
  users: (isChange: boolean) => `/users?isChange=${isChange}`,
  currentUser: '/users/me',
  userAds: (status: StatusInResponce[]) => `/users/lots?status=${status.join(',')}`,
  userBets: (status: string) => `/users/bids?status=${status}`,
  userBoughtLots: '/users/lots/bought',
  bets: '/bids',
  avatar: (id: string) => `/images/${id}`,
};
