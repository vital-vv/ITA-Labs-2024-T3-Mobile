import { Cities } from '../../../types/api/info';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getCities = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getCities: builder.query<Cities, string>({
      query: city => ({
        url: API_URL.cities(city),
        method: 'GET',
      }),
    }),
  }),
});
