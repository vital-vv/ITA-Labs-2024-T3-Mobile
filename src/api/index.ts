import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReAuth} from './baseQuery/baseQueryWithReauth';

export const agroexAPI = createApi({
  reducerPath: 'agroexAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({}),
  tagTypes: ['subCategoryLots', 'User', 'Bets', 'MyAds'],
});
