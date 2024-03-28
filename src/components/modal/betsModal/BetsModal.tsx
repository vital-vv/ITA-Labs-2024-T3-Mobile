import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {View, Modal, Pressable, TextInput} from 'react-native';
import {styles} from '../modalStyles';
import CloseIcon from '../../../assets/icons/close.svg';
import {AppText} from '../../appText/appText';
import ButtonWithoutIcon from '../../buttons/ButtonWithoutIcon/ButtonWithoutIcon';
import {setMargin} from '../../../utils/styling/margin';
import {Colors} from '../../../constants/colors';
import {TEXT_VARIANT} from '../../../types/textVariant';
import {Currency} from '../../../types/api/info';

type Props = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  minBet: number;
  maxBet: number;
  bet: number;
  currency: Currency;
  setBet: Function;
  setIsBetComplieted: Function;
};

export const BetsModal = ({
  isOpen,
  onClose,
  minBet,
  maxBet,
  bet,
  currency,
  setBet,
  setIsBetComplieted,
}: Props) => {
  const [isValidBet, setIsValidBet] = useState(false);

  const checkIsValidBet = (bet: number, minBet: number, maxBet: number) => {
    if (minBet === maxBet) {
      return setIsValidBet(false);
    } else if (bet >= minBet && bet <= maxBet) {
      return setIsValidBet(true);
    }
    return setIsValidBet(false);
  };

  useEffect(() => {
    checkIsValidBet(bet, minBet, maxBet);
  }, []);

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
            onChangeText={val => {
              checkIsValidBet(Number(val), minBet, maxBet);
              setBet(Number(val));
            }}
          />
          {isValidBet ? (
            <AppText
              text={`Price from ${minBet} ${currency} to ${maxBet} ${currency}`}
              variant={TEXT_VARIANT.MAIN_12_400}
              color={Colors.SECONDARY}
              style={setMargin(4, 0, 16, 0)}
            />
          ) : minBet === maxBet ? (
            <AppText
              text={'No more bets allowed, max bet has already been done'}
              variant={TEXT_VARIANT.MAIN_12_400}
              color={Colors.WARNING}
              style={setMargin(4, 0, 16, 0)}
            />
          ) : (
            <AppText
              text={`The bet is not correct. Please enter a bet from ${minBet} ${currency} to ${maxBet} ${currency}`}
              variant={TEXT_VARIANT.MAIN_12_400}
              color={Colors.WARNING}
              style={setMargin(4, 0, 16, 0)}
            />
          )}
          <ButtonWithoutIcon
            style={[{minHeight: 44}, setMargin(0, 0, 24, 0)]}
            type="dark"
            title={`Bet ${currency} ${bet.toString()}`}
            variant={TEXT_VARIANT.MAIN_16_500}
            onPress={() => {
              if (isValidBet) {
                setIsBetComplieted(true);
                onClose(false);
              }
            }}
            disabled={isValidBet ? false : true}
          />
        </View>
      </View>
    </Modal>
  );
};
