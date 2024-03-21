import {Cities, Selection} from '../../../types/api/api';
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
    getCities: builder.query<Cities, string>({
      query: (city) => ({
        url: API_URL.cities(city),
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});
