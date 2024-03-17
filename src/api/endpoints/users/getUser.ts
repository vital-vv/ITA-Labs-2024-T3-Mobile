import {User} from '../../../types/api/api';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getUser = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, number>({
      query: () => ({
        url: API_URL.user_me,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});
