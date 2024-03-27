import {EndpointWithMediaHeader} from '../../../constants/endpointNames';
import {LotCreate} from '../../../types/api/lots';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const createLot = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    [EndpointWithMediaHeader.CreateLot]: builder.mutation<LotCreate, LotCreate>(
      {
        query: body => ({
          url: API_URL.lots,
          method: 'POST',
          body,
        }),
      },
    ),
  }),
});
