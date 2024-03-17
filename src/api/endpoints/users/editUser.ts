import {UserEdit} from '../../../types/api/api';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const editUser = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    editUser: builder.mutation<UserEdit, UserEdit>({
      query: body => ({
        url: API_URL.users,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});
