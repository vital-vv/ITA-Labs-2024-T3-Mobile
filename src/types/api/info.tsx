export enum UserRoles {
  Employe = 'EMPLOYEE',
  Admin = 'ADMIN',
  User = 'USER',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  BYN = 'BYN',
}

export enum Packaging {
  Box = 'Box',
  Basket = 'Basket',
  Carton = 'Carton',
  Bag = 'Bag',
  Crate = 'crate',
  Bottle = 'Bottle',
  Bunch = 'Bunch',
  Sack = 'Sack',
}

export enum Weight {
  Ton = 'ton',
  KG = 'kg',
  PCS = 'PCS',
}

export enum LengthUnits {
  CM = 'cm',
  MM = 'mm',
}

export enum Status {
  Active = 'active',
  Sold = 'sold',
  Moderated = 'moderated',
  Auction_ended = 'auction_ended',
  Cancelled = 'cancelled',
  Expired = 'expired',
}

export type Cities = string[];

export type Location = {
  id?: number;
  country: string;
  region: string;
};

export type Variety = {
  category_id: number;
  parent_id: number | null;
  name: string;
  subcategories: [];
};

export enum BidStatus {
  LEADING = 'LEADING',
  OVERBID = 'OVERBID',
  WON = 'WON',
}

export type Selection = {
  packaging: Packaging[];
  weight: Weight[];
  lengthUnits: LengthUnits[];
  role: UserRoles[];
  status: Status[];
  currency: Currency[];
  countries: string[];
};

export enum StatusInResponce {
  Active = 'ACTIVE',
  Sold = 'SOLD',
  Moderated = 'MODERATED',
  Auction_ended = 'AUCTION_ENDED',
  Cancelled = 'CANCELLED',
  Expired = 'EXPIRED',
  Deactivated = 'DEACTIVATED'
}
