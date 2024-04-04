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
  users: (isChange: boolean) => `/users?isChange=${isChange}`,
  currentUser: '/users/me',
  userBets: (status: string) => `/users/bids?status=${status}`,
  bets: '/bids',
  avatar: (id: string) => `/images/${id}`,
};
