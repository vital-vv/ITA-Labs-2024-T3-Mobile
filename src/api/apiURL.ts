export const API_URL = {
  baseURL: 'http://agroex-elb-446797069.us-east-1.elb.amazonaws.com/team3/api/',
  categories: '/categories',
  category: (id: number) => `/categories/${id}`,
  lotsInSubCategory: (id: number) => `/categories/${id}/lots?page=1&limit=100`,
  lot: (id: number) => `/lots/${id}`,
  dataSelection: '/data-selection',
  users: '/users',
  userLeadingBets: (id: number) => `/users/${id}/bids?status=leading`,
  userOutbidBets: (id: number) => `/users/${id}/bids?status=overdbid`,
};
