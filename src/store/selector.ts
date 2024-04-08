import {RootState} from './index';
export const selector = {
  currentUserSliceData: (state: RootState) => state.currentUserReducer,
  amplifyAuthSliceData: (state: RootState) => state.amplifyAuthReducer,
  filterOptionsSlice: (state: RootState) => state.filterOptionsReducer,
};
