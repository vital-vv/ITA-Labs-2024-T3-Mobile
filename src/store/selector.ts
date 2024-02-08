import {RootState} from './index';
export const selector = {
  currentUserSliceData: (state: RootState) => state.currentUserReducer,
};
