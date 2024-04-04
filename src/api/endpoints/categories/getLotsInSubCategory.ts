import {
  LotsInSubCategoryInitialResponse,
  LotsInSubCategoryFinalResponse,
} from '../../../types/api/lots';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

type GetLotsInSubCategoryParams = {
  id: number;
  page?: number;
  limit: number;
  filterArgs?: string;
};

export const getLotsInSubCategory = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getLotsInSubCategory: builder.query<
      LotsInSubCategoryFinalResponse,
      GetLotsInSubCategoryParams
    >({
      query: ({id, page, limit, filterArgs}) => ({
        url: API_URL.lotsInSubCategory(id, page, limit, filterArgs),
        method: 'GET',
      }),

      providesTags: ['subCategoryLots', 'Bets'],

      transformResponse: (response: LotsInSubCategoryInitialResponse) => {
        const {size, total_elements, page} = response.metadata;
        const transformedResponse = {
          lots: response.content,
          isNextPageExist: total_elements - page * size >= 0 ? true : false,
          currentPage: page,
        };
        return transformedResponse;
      },

      serializeQueryArgs: ({queryArgs}) => {
        const newQueryArguments = {...queryArgs};
        delete newQueryArguments.page;
        return newQueryArguments;
      },

      merge: (currentCache, incomingData, queryArgs) => {
        const queryArguments = queryArgs.arg;

        if (incomingData.lots.length === 0) {
          return currentCache;
        }

        if (
          queryArguments.page &&
          queryArguments.page <= currentCache.currentPage
        ) {
          return incomingData;
        }

        const newState = {
          lots: [...currentCache.lots, ...incomingData.lots],
          currentPage: incomingData.currentPage,
          isNextPageExist: incomingData.isNextPageExist,
        };
        return newState;
      },

      forceRefetch({currentArg, previousArg}) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});
