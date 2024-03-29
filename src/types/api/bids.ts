import {Currency, Status, Weight} from './info';
import {Lot} from './lots';
import {PaginationMetaData} from './pagination';

export type Bid = {
  bid_id: number;
  user_id: string;
  lot_id: number;
  amount: number;
  status: string;
  currency: Currency;
};

export type Bet = {
  amount: number;
  currency: Currency;
  lot_id: number;
};

export type BetRequest = {
  bid_id: number;
  lot_id: number;
  expiration_date: string;
  total_price: number;
  price_per_unit: number;
  status: Status;
  amount: number;
  currency: Currency;
  title: string;
  weight: Weight;
};

export type MyBetsResponse = {
  content: Lot[];
  metadata: PaginationMetaData;
};
