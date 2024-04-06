import {LotView} from '../../components/LotView/LotView';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DeliveryStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {useGetLotQuery} from '../../api/endpoints';
import {RefreshControl, ScrollView, View} from 'react-native';
import styles from './deliveryViewScreenStyles';

type Props = NativeStackScreenProps<DeliveryStackParams, ROUTES.DeliveryView>;

export const DeliveryViewScreen: FC<Props> = ({navigation, route}) => {
  const {id} = route.params;
  const {data: lot, isLoading, refetch: refetchLot} = useGetLotQuery(id);

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
        <LotView lot={lot} />
      </ScrollView>
    )
  );
};
