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
  image_url: string;
  expiration_date: string;
  created_at: string;
  title: string;
  quantity: number;
  location: Location;
  description: string;
  status: string;
  variety: string;
  size: string;
  packaging: string;
};

export type Location = {
  id?: number;
  country: string;
  region: string;
};

export type PaginationMetaData = {
  page: number;
  size: number;
  totalElements: number;
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

export type Selection = {
  packaging: string[];
  weight: string[];
  lengthUnits: string[];
  role: string[];
  status: string[];
  currency: string[];
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

export type UserCreate = {
  first_name: string;
  last_name: string;
  preferred_currency: string;
  email: string;
  role: string;
  phoneNumber: string;
};

export type UserEdit = {
  first_name: string;
  last_name: string;
  preferred_currency: string;
  phoneNumber: string;
};

export type User = {
  user_id: string;
  first_name: string;
  last_name: string;
  preferred_currency: string;
  email: string;
  role: string;
  phoneNumber: string;
  bids: Bet[];
};

export type Bet = {
  bid_id: number;
  user_id: string;
  lot_id: number;
  status: string;
  amount: number;
  currency: string;
};