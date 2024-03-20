import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {API_URL} from '../apiURL';
import {fetchAuthSession} from 'aws-amplify/auth';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL.baseURL,

  prepareHeaders: async headers => {
    try {
      const userSessionData = await fetchAuthSession();
      const token = userSessionData.tokens?.idToken?.toString();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        return headers;
      }
    } catch (e) {
      return headers;
    }
  },
});
