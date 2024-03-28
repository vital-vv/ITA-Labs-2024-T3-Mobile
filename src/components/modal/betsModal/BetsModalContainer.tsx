import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useCreateBetMutation} from '../../../api/endpoints';
import {BetsModal} from './BetsModal';
import {Currency} from '../../../types/api/info';
import {Bet} from '../../../types/api/lots';

type Props = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  minBet: number;
  maxBet: number;
  lot_id: number;
  currency: Currency;
};

export const BetsModalContainer = (props: Props) => {
  const [bet, setBet] = useState(props.maxBet);
  const [isBetComplieted, setIsBetComplieted] = useState(false);
  const [createBet, {isError, error, isSuccess}] = useCreateBetMutation();

  const transformValuesCreateBet = (
    bet: number,
    lot_id: number,
    currency: Currency,
  ): Bet => {
    const RequestBody = {
      lot_id: lot_id,
      amount: bet,
      currency: currency,
    };
    return RequestBody;
  };

  useEffect(() => {
    if (isBetComplieted) {
      const values = transformValuesCreateBet(
        bet,
        props.lot_id,
        props.currency,
      );
      createBet(values);
      setIsBetComplieted(false);
    }
  }, [isBetComplieted]);

  return (
    <BetsModal
      {...props}
      bet={bet}
      setBet={setBet}
      setIsBetComplieted={setIsBetComplieted}
    />
  );
};
