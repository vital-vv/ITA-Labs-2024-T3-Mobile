import {Bid} from './bids';
import {Currency, Location, Packaging, Status, Variety, Weight} from './info';
import {PaginationMetaData} from './pagination';

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
  weight: Weight;
  location: Location;
  description: string;
  status: Status;
  size: number;
  packaging: Packaging;
  leading: Bid | null;
  users: Bid;
  currency: Currency;
  lot_id: number;
  category_id: number;
  category_name: string;
  price_per_unit: number;
  image_url: LotImage[];
  expiration_date: string;
  created_at: string;
  created_by: string;
  total_price: number;
  start_price: number;
  length_unit: string;
  bid_quantity: number;
  reject_message: string;
};

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
  weight: Weight;
  location: Location;
  description: string;
  size: number;
  packaging: Packaging;
  currency: Currency;
};

export type LotImage = {
  id: number;
  name?: string;
  url: string;
  mainImage?: boolean;
};

export type imageUrl = {
  id: number;
  imageURL: string;
  file: {uri: string; type: string; name: string};
};

export type MyAdsResponse = {
  content: Lot[];
  metadata: PaginationMetaData;
};
