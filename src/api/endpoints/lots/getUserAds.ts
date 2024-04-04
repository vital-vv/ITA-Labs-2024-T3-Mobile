import {MyAdsResponse} from '../../../types/api/lots';
import {StatusInResponce} from '../../../types/api/info';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

type StatusParams = {
  status: StatusInResponce[];
};

export const getUserAds = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getUserAds: builder.query<MyAdsResponse, StatusParams>({
      query: ({status}) => ({
        url: API_URL.userAds(status.join('&status=')),
        method: 'GET',
      }),
      providesTags: ['MyAds'],
    }),
  }),
});
