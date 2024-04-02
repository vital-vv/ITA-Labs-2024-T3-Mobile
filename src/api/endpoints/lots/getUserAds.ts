import {MyAdsResponse} from '../../../types/api/lots';
import {Status} from '../../../types/api/info';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getUserAds = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getUserAds: builder.query<MyAdsResponse, Status>({
      query: status => ({
        url: API_URL.userAds(status),
        method: 'GET',
      }),
    }),
  }),
});
