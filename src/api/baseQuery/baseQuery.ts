import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {API_URL} from '../apiURL';
import {fetchAuthSession} from 'aws-amplify/auth';
import {EndpointWithMediaHeader} from '../../constants/endpointWithMediaHeaders';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL.baseURL,
  prepareHeaders: async (headers, api) => {
    try {
      const isNeedMediaHeader = Object.values(EndpointWithMediaHeader).some(
        arg => (arg === api.endpoint ? true : false),
      );
      const userSessionData = await fetchAuthSession();
      const token = userSessionData.tokens?.idToken?.toString();
      headers.set(
        'Content-Type',
        `${isNeedMediaHeader ? 'multipart/form-data' : 'application/json'}`,
      );
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    } catch (e) {
      return headers;
    }
  },
});
