import {Bid} from './bids';
import {Currency, UserRoles} from './info';

export type UserCreateParams = {
  first_name: string;
  last_name: string;
  preferred_currency: Currency;
  phoneNumber: string;
};

export type UserUpdateParams = UserCreateParams;

export type UserCreateResponse = {
  user_id: string;
  first_name: string;
  last_name: string;
  preferred_currency: Currency;
  email: string;
  role: UserRoles;
  phoneNumber: string;
  photo: string;
  bids: Bid[] | null;
};

export type CurrentUserResponse = UserCreateResponse;

export type UserUpdateResponse = UserCreateResponse;
