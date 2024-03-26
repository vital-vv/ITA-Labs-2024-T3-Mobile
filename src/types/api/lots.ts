import {Bid} from './bids';
import {Image, Packaging} from './info';
import {PaginationMetaData} from './pagination';

export type Variety = {
  category_id: number;
  parent_id: number | null;
  name: string;
  subcategories: [];
};

export type SubCategory = {
  subcategory_id: string;
  category_id: number;
  parent_id: number | null;
  name: string;
  subcategories: Variety[];
};

export type Category = {
  category_id: number;
  name: string;
  parent_id: number | null;
  subcategories: SubCategory[];
};

export type Lot = {
  title: string;
  quantity: number;
  weight: string;
  location: Location;
  description: string;
  status: string;
  size: number;
  packaging: string;
  leading: Bid;
  users: Bid;
  currency: string;
  lot_id: number;
  category_id: number;
  category_name: string;
  price_per_unit: number;
  image_url: Image[];
  expiration_date: string;
  created_at: string;
  created_by: string;
  total_price: number;
  start_price: number;
  length_unit: string;
  bid_quantity: number;
};

export type Location = {
  id?: number;
  country: string;
  region: string;
};

export type Cities = string[];

export type LotsInSubCategoryInitialResponse = {
  content: Lot[];
  metadata: PaginationMetaData;
};

export type LotsInSubCategoryFinalResponse = {
  lots: Lot[];
  currentPage: number;
  isNextPageExist: boolean;
};

export type LotCreate = {
  category_id: number;
  total_price: number;
  start_price: number;
  expiration_days: number;
  length_unit: string;
  title: string;
  quantity: number;
  weight: string;
  location: Location;
  description: string;
  size: number;
  packaging: string;
  currency: string;
};

export type imageUrl = {
  id: number;
  imageURL: string;
  file: {uri: string; type: string; name: string};
};
