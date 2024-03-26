import {LotCreate} from '../../../types/api/lots';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const createLot = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    createLot: builder.mutation<LotCreate, FormData>({
      query: body => ({
        url: API_URL.lots,
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
  }),
  overrideExisting: true,
});
