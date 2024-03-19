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
}

export type Selection = {
  packaging: Packaging[];
  weight: Weight[];
  lengthUnits: LengthUnits[];
  role: UserRoles[];
  status: Status[];
  currency: Currency[];
};

