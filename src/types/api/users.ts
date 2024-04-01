import {Bid} from './bids';
import {Currency, UserRoles} from './info';
import {LotImage} from './lots';

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
  avatarId: string;
};

export type CurrentUserResponse = UserCreateResponse;

export type UserEditResponse = UserCreateResponse;

export type UserAvatarResponse = LotImage;
