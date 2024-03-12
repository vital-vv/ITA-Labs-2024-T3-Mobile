import {FC} from 'react';
import {View} from 'react-native';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import Moderator from '../../assets/icons/account_moderator.svg';
import { AppText } from '../appText/appText';
import { setMargin } from '../../utils/styling/margin';
import { setPadding } from '../../utils/styling/padding';
import ButtonWithoutIcon from '../buttons/ButtonWithoutIcon/ButtonWithoutIcon';
import styles from './notificationStyles'

export type Props =  {
  lot_id: number;
};

export const ModerationSuccessful: FC<Props> = ({lot_id}) => {
  return (
    <View style={[setPadding(20, 20, 20, 20), styles.container]}>
        <View style={styles.title}>
            <Moderator fill={Colors.SYSTEM_BASE}/>
            <AppText
                text={'Moderation is successful'}
                style={setMargin(0, 0, 0, 8)}
                variant={TEXT_VARIANT.MAIN_16_500}
                color={Colors.PRIMARY}
            />
        </View>
        <AppText
                text={`Your Lot ${lot_id} has been moderated and has already been published.`}
                style={styles.text}
                variant={TEXT_VARIANT.MAIN_14_400}
                color={Colors.PRIMARY}
            />
        <View style={styles.button_container}>
            <ButtonWithoutIcon 
                title='Got it!'
                type = 'dark'
                variant = {TEXT_VARIANT.MAIN_14_500}
                style={[styles.button,  setPadding(6, 0, 6, 0)]}
            />
            <ButtonWithoutIcon 
                title='Jump to lot'
                type = 'light'
                variant = {TEXT_VARIANT.MAIN_14_500}
                style={[styles.button,  setPadding(6, 0, 6, 0)]}
            />
        </View>
    </View>
  );
};
