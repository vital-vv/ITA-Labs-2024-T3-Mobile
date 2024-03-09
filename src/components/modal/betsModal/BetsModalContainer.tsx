import {Children, Dispatch, ReactNode, SetStateAction, useState} from 'react';
import {View, Modal, ScrollView, Pressable, Text, TextInput} from 'react-native';
import {styles} from '../modalStyles';
import CloseIcon from '../../../assets/icons/close.svg';
import { AppText } from '../../appText/appText';
import ButtonWithoutIcon from '../../buttons/ButtonWithoutIcon/ButtonWithoutIcon';
import { setMargin } from '../../../utils/styling/margin';
import { Colors } from '../../../constants/colors';
import { TEXT_VARIANT } from '../../../types/textVariant';
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

    const transformValuesCreateBet: (bet:number, lot_id: number) => Object = (bet, lot_id) => {
        const RequestBody = {
          user_id: 1,
          lot_id:  lot_id,
          amount: bet,
          currency: 'USD',
        };
        return RequestBody
    }

    if (isBetComplieted) {
        const values = transformValuesCreateBet(bet, props.lot_id);
    }

  return (
    <BetsModal {...props} bet={bet} setBet={setBet} setIsBetComplieted={setIsBetComplieted}/>
  );
};
