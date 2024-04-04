import {Pressable, RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './myAdViewScreenStyles';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon';
import React, {FC, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyAdsStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {useConfirmLotMutation, useDeactivateLotMutation, useGetLotQuery} from '../../api/endpoints';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {Colors} from '../../constants/colors';
import {LotView} from '../../components/LotView/LotView';
import CheckIcon from '../../assets/icons/checkmark.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import ShutDown from '../../assets/icons/shut_down.svg';
import {ModalWindow} from '../../components/modal/modal';
import {TEXT_VARIANT} from '../../types/textVariant';
import {AppText} from '../../components/appText/appText';
import {globalNavigate} from '../../navigation/globalNavigation';

type Props = NativeStackScreenProps<MyAdsStackParams, ROUTES.MyAdView>;

export const MyAdViewScreen: FC<Props> = ({navigation, route}) => {
  const {id, position} = route.params;
  const {data: lot, isLoading, refetch: refetchLot} = useGetLotQuery(id);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [confirmLot] = useConfirmLotMutation();
  const [deactivateLot] = useDeactivateLotMutation();

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
        <LotView lot={lot} position={position === 'active' ? 'success' : 'none'}/>
        <View style={styles.buttons_wrapper}>
          {position === 'active' &&
          <ButtonWithIcon
            title="Confirm deal"
            type="success"
            icon={<CheckIcon fill={Colors.WHITE} />}
            onPress={() => {confirmLot(lot.lot_id),
              globalNavigate(ROUTES.AccountStack, {screen: ROUTES.MyAdsStack})}}
          />
          }
          {position === 'pending' &&
            <ButtonWithIcon
            title="Manage"
            type="light"
            icon={<SettingsIcon fill={Colors.BUTTON_PRIMARY} />}
            onPress={() => setIsModalVisible(true)}
          />
          }
        </View>
        <ModalWindow
          isOpen={isModalVisible}
          onClose={setIsModalVisible}>
          <Pressable
            onPress={() => {deactivateLot(lot.lot_id), 
            setIsModalVisible(false),
            globalNavigate(ROUTES.AccountStack, {screen: ROUTES.MyAdsStack})}}>
            <View style={styles.block}>
              <ShutDown />
              <AppText
                text={'Deactivate'}
                color={Colors.ERROR_BASE}
                variant={TEXT_VARIANT.MAIN_18_400}
              />
            </View>
          </Pressable>
      </ModalWindow>
      </ScrollView>
    )
  );
};
