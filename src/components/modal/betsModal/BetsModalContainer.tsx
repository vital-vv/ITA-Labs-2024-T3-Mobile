import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import { useCreateBetMutation } from '../../../api/endpoints';
import { BetsModal } from './BetsModal';

type Props = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  minBet: number;
  maxBet: number;
  lot_id: number;
};

export const BetsModalContainer = (props: Props) => {
    const [bet, setBet] = useState(props.maxBet)
    const [isBetComplieted, setIsBetComplieted] = useState(false)
    const [createBet, {isError, error, isSuccess }] = useCreateBetMutation()

    const transformValuesCreateBet: (bet:number, lot_id: number) => Object = (bet, lot_id) => {
        const RequestBody = {
          user_id: 1,
          lot_id:  lot_id,
          amount: bet,
          currency: 'USD',
        };
        return RequestBody
    }

    useEffect(() => {
      if (isBetComplieted) {
        const values = transformValuesCreateBet(bet, props.lot_id);
        createBet(values)
        setIsBetComplieted(false)
      }
    }, [isBetComplieted])

  return (
    <BetsModal {...props} bet={bet} setBet={setBet} setIsBetComplieted={setIsBetComplieted}/>
  );
};
