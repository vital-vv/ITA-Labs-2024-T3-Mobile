import {ScrollView} from 'react-native';
import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {ConfirmedBet} from '../../components/notifications/ConfirmedBet';
import {ModerationSuccessful} from '../../components/notifications/ModerationSuccessful';
import {NewBet} from '../../components/notifications/NewBet';
import {OutbiddedLot} from '../../components/notifications/OutbiddedLot';
import {PurchasedLot} from '../../components/notifications/PurchasedLot';
import {setPadding} from '../../utils/styling/padding';
import {ModerationUnsuccessful} from '../../components/notifications/ModerationUnsuccessful';
import {ConfirmedBuy} from '../../components/notifications/ConfirmedBuy';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AccountStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {FC} from 'react';

type Props = NativeStackScreenProps<AccountStackParams, ROUTES.Notifications>;

export const NotificationsScreen: FC<Props> = ({navigation, route}) => {
  return (
    <MainWrapper>
      <ScrollView>
        <OutbiddedLot lot_id={1} />
        <PurchasedLot lot_id={1} />
        <NewBet lot_id={1} />
        <ConfirmedBet lot_id={1} />
        <ConfirmedBuy lot_id={1} />
        <ModerationSuccessful lot_id={1} />
        <ModerationUnsuccessful lot_id={1} />
      </ScrollView>
    </MainWrapper>
  );
};
