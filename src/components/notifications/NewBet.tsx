import {FC} from 'react';
import {View} from 'react-native';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import Bet from '../../assets/icons/bet.svg';
import { AppText } from '../appText/appText';
import { setMargin } from '../../utils/styling/margin';
import { setPadding } from '../../utils/styling/padding';
import ButtonWithoutIcon from '../buttons/ButtonWithoutIcon/ButtonWithoutIcon';
import styles from './notificationStyles'

export type Props =  {
  lot_id: number;
};

export const NewBet: FC<Props> = ({lot_id}) => {
  return (
    <View style={[setPadding(20, 20, 20, 20), styles.container]}>
        <View style={styles.title}>
            <Bet />
            <AppText
                text={'New bet'}
                style={setMargin(0, 0, 0, 8)}
                variant={TEXT_VARIANT.MAIN_16_500}
                color={Colors.PRIMARY}
            />
        </View>
        <AppText
                text={`A new bet has been placed on your Lot ${lot_id}.`}
                style={styles.text}
                variant={TEXT_VARIANT.MAIN_14_400}
                color={Colors.PRIMARY}
            />
        <View style={styles.button_container}>
            <ButtonWithoutIcon 
                title='Overbid'
                type = 'dark'
                variant = {TEXT_VARIANT.MAIN_14_500}
                style={[styles.button,  setPadding(6, 0, 6, 0)]}
            />
            <ButtonWithoutIcon 
                title='Okay'
                type = 'light'
                variant = {TEXT_VARIANT.MAIN_14_500}
                style={[styles.button,  setPadding(6, 0, 6, 0)]}
            />
        </View>
    </View>
  );
};
