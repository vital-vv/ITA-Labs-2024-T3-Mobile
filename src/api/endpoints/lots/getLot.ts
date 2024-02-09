import { Lot } from '../../../types/api/api';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getLot = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getLot: builder.query<Lot, number>({
      query: id => ({
        url: API_URL.lot(id),
        method: 'GET',
      }),
    }),
  }),
});
