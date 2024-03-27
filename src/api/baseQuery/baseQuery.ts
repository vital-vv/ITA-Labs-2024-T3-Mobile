import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {API_URL} from '../apiURL';
import {fetchAuthSession} from 'aws-amplify/auth';
import {EndpointWithMediaHeader} from '../../constants/endpointNames';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL.baseURL,

  prepareHeaders: async (headers, api) => {
    try {
      const isNeedMediaHeader = Object.values(EndpointWithMediaHeader).some(
        arg => (arg === `${api.endpoint}` ? true : false),
      );
      const userSessionData = await fetchAuthSession();
      const token = userSessionData.tokens?.idToken?.toString();

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      if (isNeedMediaHeader) {
        headers.set('Content-Type', 'multipart/form-data');
      }
    } catch (e) {
      return headers;
    }
  },
});
