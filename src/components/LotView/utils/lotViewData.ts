import {Lot} from '../../../types/api/lots';
import {DateTime} from 'luxon';

type LotData = {
  text: string;
  color?: boolean;
};

export const lotViewData = (lot: Lot): Array<LotData> => {
  const lotViewDataArray = [
    {
      text: 'Variety',
      color: true,
    },
    {
      text: `${lot.category_name}`,
    },
    {
      text: 'Quantity',
      color: true,
    },
    {
      text: `${lot.quantity} ${lot.weight}`,
    },
    {
      text: 'Size from',
      color: true,
    },
    {
      text: `${lot.fromSize} ${lot.length_unit}`,
    },
    {
      text: 'Size to',
      color: true,
    },
    {
      text: `${lot.toSize} ${lot.length_unit}`,
    },
    {
      text: 'Packaging',
      color: true,
    },
    {text: `${lot.packaging}`, id: 1},
    {
      text: 'Location',
      color: true,
    },
    {
      text: `${lot.location.country}, ${lot.location.region}`,
    },
    {
      text: 'Created',
      color: true,
    },
    {
      text: `${DateTime.fromISO(lot.created_at).toFormat(
        'yyyy.LL.dd, HH:mm ',
      )}`,
    },
  ];
  return lotViewDataArray;
};
