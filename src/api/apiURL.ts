export const API_URL = {
  baseURL: 'http://ita-labs-2024-t3-730676977.us-east-1.elb.amazonaws.com/api/',
  categories: '/categories',
  category: (id: number) => `/categories/${id}`,
  lotsInSubCategory: (id: number) => `/categories/${id}/lots`,
  lot: (id: number) => `/lots/${id}`,
};
