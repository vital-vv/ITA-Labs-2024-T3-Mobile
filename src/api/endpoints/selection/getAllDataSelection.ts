import { Selection } from '../../../types/api/info';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getAllDataSelection = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getAllSelection: builder.query<Selection, void>({
      query: () => ({
        url: API_URL.dataSelection,
        method: 'GET',
      }),
    }),
  }),
});
