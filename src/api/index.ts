import {API_URL} from './apiURL';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseQueryFn = () =>
  fetchBaseQuery({
    baseUrl: API_URL.baseURL,
  });

export const agroexAPI = createApi({
  reducerPath: 'agroexAPI',
  baseQuery: baseQueryFn(),
  endpoints: builder => ({}),
});

