import {BidStatus, Currency} from './info';

export type Bid = {
  bid_id: number;
  user_id: string;
  lot_id: number;
  amount: number;
  status: BidStatus;
  currency: Currency;
};
