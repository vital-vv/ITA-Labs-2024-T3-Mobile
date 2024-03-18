import {UserCreate} from '../../../types/api/api';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const createUser = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation<UserCreate, UserCreate>({
      query: body => ({
        url: API_URL.users,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});
