import {MainSortField, SortOrder} from '../../../types/filterOptions';

export const mainSortField = [
  {label: 'Quantity', value: MainSortField.Quantity},
  {label: 'Trading start date', value: MainSortField.CreatedAt},
  {label: 'Expiration date', value: MainSortField.ExpirationDate},
  {label: 'Size', value: MainSortField.Size},
  {label: 'Bid quantity', value: MainSortField.BidQuantity},
];

export const sortOrder = [
  {label: 'From min to max', value: SortOrder.ASC},
  {label: 'From max to min', value: SortOrder.DESC},
];

export const itemsPerPage = [
  {label: '10 items', value: '10'},
  {label: '20 items', value: '20'},
  {label: '30 items', value: '30'},
  {label: '40 items', value: '40'},
  {label: '50 items', value: '50'},
];
