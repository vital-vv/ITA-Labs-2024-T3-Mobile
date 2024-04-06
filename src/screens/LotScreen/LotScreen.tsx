import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './lotScreenStyles';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon';
import React, {FC, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {useBuyLotMutation, useGetLotQuery} from '../../api/endpoints';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {Colors} from '../../constants/colors';
import ShoppingIcon from '../../assets/icons/shopping.svg';
import BetIcon from '../../assets/icons/bet.svg';
import {LotView} from '../../components/LotView/LotView';
import {BetsModalContainer} from '../../components/modal/betsModal/BetsModalContainer';
import {Status} from '../../types/api/info';
import {useAppSelector} from '../../store/hooks';
import {selector} from '../../store/selector';
import {showToast} from '../../components/toasts';
import {ToastTypes} from '../../types/toasts';
import {globalNavigate} from '../../navigation/globalNavigation';

type Props = NativeStackScreenProps<HomeStackParams, ROUTES.Lot>;

export const LotScreen: FC<Props> = ({navigation, route}) => {
  const {id} = route.params;
  const {data: lot, isLoading, refetch: refetchLot} = useGetLotQuery(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useAppSelector(selector.currentUserSliceData);
  const [buyLot] = useBuyLotMutation();

  if (isLoading) {
    return <SpinnerWrapper />;
  }

  const onBuyNow = async (lot_id: number) => {
    try {
      await buyLot(lot_id).unwrap();
      showToast(ToastTypes.Success, 'Lot was successfully bought');
      globalNavigate(ROUTES.HomeStack, {
        screen: ROUTES.LotList,
        params: {id: route.params.id, headerTitle: route.params.headerTitle},
      });
    } catch (error) {
      showToast(ToastTypes.Error, 'Something went wrong during lot buying');
    }
  };

  return (
    lot && (
      <ScrollView
        style={styles.lotScreenWrapper}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetchLot} />
        }>
        <LotView lot={lot} />
        {lot.created_by !== user.userId && user.isLoggedIn && (
          <View style={styles.buttons_wrapper}>
            <ButtonWithIcon
              title="Place a bet"
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
              icon={
                <ShoppingIcon
                  fill={Colors.WHITE}
                  onPress={() => onBuyNow(lot.lot_id)}
                />
              }
            />
          </View>
        )}
        <BetsModalContainer
          isOpen={isModalVisible}
          onClose={setIsModalVisible}
          minBet={lot.start_price}
          maxBet={lot.total_price - 1}
          lot_id={id}
          currency={lot.currency}
        />
      </ScrollView>
    )
  );
};
