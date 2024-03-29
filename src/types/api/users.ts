import {Bid} from './bids';
import {Currency, UserRoles} from './info';

export type UserCreateParams = {
  first_name: string;
  last_name: string;
  preferred_currency?: Currency;
  email?: string;
  role?: UserRoles;
  phoneNumber?: string;
};

export type UserUpdateParams = {
  first_name: string;
  last_name: string;
  preferred_currency: string;
  phoneNumber: string;
};

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
  avatarId: string | number;
};

export type CurrentUserResponse = UserCreateResponse;

export type UserUpdateResponse = UserCreateResponse;
