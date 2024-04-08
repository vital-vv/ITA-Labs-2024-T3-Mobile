import {LotView} from '../../components/LotView/LotView';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {FC, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BetStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {useBuyLotMutation, useGetLotQuery} from '../../api/endpoints';
import {RefreshControl, ScrollView, View} from 'react-native';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon';
import styles from './betViewScreenStyles';
import ShoppingIcon from '../../assets/icons/shopping.svg';
import BetIcon from '../../assets/icons/bet.svg';
import {Colors} from '../../constants/colors';
import {BetsModalContainer} from '../../components/modal/betsModal/BetsModalContainer';
import {Status} from '../../types/api/info';
import {showToast} from '../../components/toasts';
import {globalNavigate} from '../../navigation/globalNavigation';
import {ToastTypes} from '../../types/toasts';

type Props = NativeStackScreenProps<BetStackParams, ROUTES.BetView>;

export const BetViewScreen: FC<Props> = ({navigation, route}) => {
  const {id, position} = route.params;
  const {data: lot, isLoading, refetch: refetchLot} = useGetLotQuery(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buyLot] = useBuyLotMutation();

  const onBuyNow = async (lot_id: number) => {
    try {
      await buyLot(lot_id).unwrap();
      showToast(ToastTypes.Success, 'Lot was successfully bought');
      globalNavigate(ROUTES.BetStack, {
        screen: ROUTES.Bets,
      });
    } catch (error) {
      showToast(ToastTypes.Error, 'Something went wrong during lot buying');
    }
  };

  if (isLoading) {
    return <SpinnerWrapper />;
  }

  return (
    lot && (
      <ScrollView
        style={styles.lotScreenWrapper}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetchLot} />
        }>
        <LotView lot={lot} position={position} />
        <View style={styles.buttons}>
          <ButtonWithIcon
            title={position == 'outbid' ? 'My bet' : 'Place a bet'}
            type="light"
            icon={
              <BetIcon
                fill={
                  lot.status === Status.Auction_ended
                    ? Colors.TERTIARY
                    : Colors.BUTTON_PRIMARY
                }
              />
            }
            onPress={() => setIsModalVisible(true)}
            disabled={lot.status === Status.Auction_ended}
          />
          <ButtonWithIcon
            title="Buy now"
            type="dark"
            onPress={() => onBuyNow(lot.lot_id)}
            icon={
              <ShoppingIcon
                fill={Colors.WHITE}
              />
            }
          />
        </View>
        <BetsModalContainer
          isOpen={isModalVisible}
          onClose={setIsModalVisible}
          minBet={lot.start_price}
          maxBet={lot.total_price - 1}
          lot_id={id}
          currency={lot.currency}
          myBet={position == 'outbid' ? lot.users.amount : null}
        />
      </ScrollView>
    )
  );
};
