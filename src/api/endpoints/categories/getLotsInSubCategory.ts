import {
  LotsInSubCategoryInitialResponse,
  LotsInSubCategoryFinalResponse,
  GetLotsInSubCategoryParams,
} from '../../../types/api/lots';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

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
        const {has_next, page} = response.metadata;
        const transformedResponse = {
          lots: response.content,
          isNextPage: has_next,
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
          isNextPage: incomingData.isNextPage,
        };
        return newState;
      },

      forceRefetch({currentArg, previousArg}) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});
