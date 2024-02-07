export type SubCategory = {
  subcategory_id: string;
  category_id: number;
  name: string;
};

export type Category = {
  category_id: number;
  name: string;
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
  id: number;
  country: string;
  region: string;
};
