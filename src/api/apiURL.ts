export const API_URL = {
  baseURL: 'http://10.0.2.2:3001/',
  categories: '/categories',
  category: (id: number) => `/category/?category_id=${id}`,
  lotsInSubCategory: (id: number) => `/lots`,
  lot: (id: number) => `/lots/?lot_id=${id}`,
};
