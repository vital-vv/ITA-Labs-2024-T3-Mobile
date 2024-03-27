import {LotImage, Packaging} from './info';
import {PaginationMetaData} from './pagination';

export type SubCategory = {
  subcategory_id: string;
  category_id: number;
  parent_id: number | null;
  name: string;
};

export type Category = {
  category_id: number;
  name: string;
  parent_id: number | null;
  subcategories: SubCategory[];
};

export type Lot = {
  lot_id: number;
  category_id: number;
  category_name: string;
  price_per_unit: number;
  image_url: LotImage[];
  expiration_date: string;
  created_at: string;
  title: string;
  quantity: number;
  location: Location;
  description: string;
  status: string;
  variety: string;
  size: string;
  packaging: Packaging;
};

export type Location = {
  id?: number;
  country: string;
  region: string;
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
  price_per_unit: number;
  title: string;
  length_unit: string;
  quantity: number;
  weight: string;
  location: Location;
  description: string;
  status: string;
  variety: string;
  size: number;
  packaging: string;
};
