import { LotView } from '../../components/LotView/LotView';
import { SpinnerWrapper } from '../../components/spinnerWrapper/spinnerWrapper';
import {FC, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BetStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {useGetLotQuery} from '../../api/endpoints';
import { RefreshControl, ScrollView, TextInput, View } from 'react-native';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon';
import styles from './betViewScreenStyles';
import ShoppingIcon from '../../assets/icons/shopping.svg';
import BetIcon from '../../assets/icons/bet.svg';
import {Colors} from '../../constants/colors';
import { ModalWindow } from '../../components/modal/modal';
import { AppText } from '../../components/appText/appText';
import { TEXT_VARIANT } from '../../types/textVariant';
import { setMargin } from '../../utils/styling/margin';
import { BetsModal } from '../../components/modal/betsModal/BetsModal';
import { BetsModalContainer } from '../../components/modal/betsModal/BetsModalContainer';


type Props = NativeStackScreenProps<BetStackParams, ROUTES.BetView>;

export const BetViewScreen: FC<Props> = ({navigation, route}) => {

  const {id} = route.params;
  const {data: lot, isLoading, refetch: refetchLot} = useGetLotQuery(id);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (isLoading) return <SpinnerWrapper />;

  return (
    lot && (
      <ScrollView style={styles.lotScreenWrapper}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetchLot} />
        }>
      <LotView lot={lot} position={route.params.position}/>
      <View style={styles.buttons}>
          <ButtonWithIcon
            title="New bet"
            type="light"
            icon={<BetIcon fill={Colors.BUTTON_PRIMARY} />}
            onPress={() => setIsModalVisible(true)}
          />
          <ButtonWithIcon
            title="Buy now"
            type="dark"
            icon={<ShoppingIcon fill={Colors.WHITE} />}
          />
        </View>
        <BetsModalContainer isOpen={isModalVisible} onClose={setIsModalVisible} minBet={10000} maxBet={12000} lot_id={id}/>
        </ScrollView>
  ));
}