import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Packaging, Weight} from '../../types/api/info';
import {MainSortField, SortOrder} from '../../types/filterOptions';

export type FilterOptionsState = {
  page: number;
  itemsPerPage: number;
  mainSortField?: MainSortField;
  packaging: string[];
  countries: string[];
  sortOrder: string;
  cities?: string[];
  weigth?: Weight;
  fromSize?: number;
  toSize?: number;
  fromPrice?: string;
  toPrice?: string;
  fromQuantity?: number;
  toQuantity?: number;
  keyWord?: string;
};

export const filterOptionsInitialState: FilterOptionsState = {
  page: 1,
  itemsPerPage: 10,
  mainSortField: undefined,
  packaging: [],
  countries: [],
  sortOrder: '',
  cities: undefined,
  weigth: undefined,
  fromSize: undefined,
  toSize: undefined,
  fromPrice: undefined,
  toPrice: undefined,
  fromQuantity: undefined,
  toQuantity: undefined,
  keyWord: undefined,
};

export const filterOptionsSlice = createSlice({
  name: 'filterOptionsSlice',
  initialState: filterOptionsInitialState,
  reducers: {
    setFilterOptions(state, action: PayloadAction<FilterOptionsState>) {
      return {...state, ...action.payload};
    },
    setNextPage(state) {
      state.page = state.page + 1;
    },
    resetFilterOptions: state => {
      return {...filterOptionsInitialState};
    },
  },
});

export const filterOptionsReducer = filterOptionsSlice.reducer;

export const filterActions = filterOptionsSlice.actions;
