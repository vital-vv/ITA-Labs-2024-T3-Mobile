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

type Props = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  minBet: number;
  maxBet: number;
};

export const BetsModal = ({isOpen, onClose, minBet, maxBet}: Props) => {
    const [bet, setBet] = useState(maxBet)

    const isValidBet: (bet:number, minBet: number, maxBet: number) => void = (bet, minBet, maxBet) => {
      if (bet >= minBet && bet <= maxBet) {
      }
    }

  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      transparent={true}
      statusBarTranslucent={false}>
      <View style={styles.modalWrapper}>
        <View style={styles.content}>
          <Pressable
            style={styles.closeBtn}
            onPress={() => {
              onClose(false);
            }}>
            <CloseIcon />
          </Pressable>
          <TextInput
            keyboardType="number-pad"
            style={{borderColor: 'black', borderWidth: 1, padding: 10}}
            value={bet.toString()}
            onChangeText={(val) => {setBet(Number(val))}} 
          ></TextInput>
          <AppText
            text={`Price from ${minBet} to ${maxBet}`}
            variant={TEXT_VARIANT.MAIN_12_400}
            color={Colors.SECONDARY}
            style={setMargin(4, 0, 16, 0)}
          />
          <ButtonWithoutIcon 
            style={[{minHeight: 44},setMargin(0, 0, 24, 0)]}
            type="dark" 
            title={`Bet $${bet.toString()}`} 
            variant={TEXT_VARIANT.MAIN_16_500} 
            onPress={() => {onClose(false)}}/>
        </View>
      </View>
    </Modal>
  );
};
