import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';
import {MyAdsStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {FC, useState} from 'react';
import {StatusInResponce} from '../../types/api/info';
import {useGetUserAdsQuery} from '../../api/endpoints';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import styles from './myAdsScreenStyles';
import {Pressable, RefreshControl, View} from 'react-native';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import {buttonsData} from './utils/myAdsButtonsData';
import {FlashList} from '@shopify/flash-list';
import {MyAdsItem} from '../../components/myAdsItem/MyAdsItem';
import {Lot} from '../../types/api/lots';

type Props = NativeStackScreenProps<MyAdsStackParams, ROUTES.MyAds>;

export const MyAdsScreen: FC<Props> = ({navigation, route}) => {
  const [isActive, setIsActive] = useState('Active');

  const {
    data: myActiveAdsData,
    isLoading: isLoadingActiveAds,
    refetch: refetchGetUserActiveAds,
  } = useGetUserAdsQuery({status: [StatusInResponce.Active]});

  const {
    data: myPendingAdsData,
    isLoading: isLoadingPendingAds,
    refetch: refetchGetUserPendingAds,
  } = useGetUserAdsQuery({
    status: [StatusInResponce.Moderated, StatusInResponce.Cancelled],
  });

  const {
    data: myInactiveAdsData,
    isLoading: isLoadingInactiveAds,
    refetch: refetchGetUserInactiveAds,
  } = useGetUserAdsQuery({
    status: [
      StatusInResponce.Expired,
      StatusInResponce.Sold,
      StatusInResponce.Deactivated,
      StatusInResponce.Auction_ended,
    ],
  });

  const onClick = (item: Lot) => {
    navigation.navigate(ROUTES.MyAdView, {
      id: item.lot_id,
      headerTitle: item.title || '',
      position:
        isActive === 'Active'
          ? 'active'
          : isActive === 'Pending'
          ? 'pending'
          : 'expired',
    });
  };

  if (isLoadingActiveAds && isLoadingPendingAds && isLoadingInactiveAds) {
    return <SpinnerWrapper />;
  }

  return (
    <MainWrapper>
      <View style={styles.button_wrapper}>
        {buttonsData().map((item, index) => (
          <View key={item.number}>
            <Pressable
              onPress={() => {
                setIsActive(item.title);
              }}
              style={[
                styles.button,
                isActive === item.title && styles.button_pressed,
              ]}>
              <AppText
                text={item.title}
                variant={TEXT_VARIANT.MAIN_18_500}
                color={Colors.PRIMARY}
                style={setPadding(10, 16, 10, 16)}
              />
            </Pressable>
          </View>
        ))}
      </View>
      <FlashList
        estimatedItemSize={300}
        refreshControl={
          <RefreshControl
            refreshing={
              isActive === 'Active'
                ? isLoadingActiveAds
                : isActive === 'Pending'
                ? isLoadingPendingAds
                : isLoadingInactiveAds
            }
            onRefresh={
              isActive === 'Active'
                ? refetchGetUserActiveAds
                : isActive === 'Pending'
                ? refetchGetUserPendingAds
                : refetchGetUserInactiveAds
            }
          />
        }
        data={
          isActive === 'Active'
            ? myActiveAdsData?.content
            : isActive === 'Pending'
            ? myPendingAdsData?.content
            : myInactiveAdsData?.content
        }
        renderItem={({item}) => (
          <Pressable
            style={{...setPadding(0, 16, 0, 16)}}
            onPress={() => onClick(item)}>
            <MyAdsItem lot={item} />
          </Pressable>
        )}
      />
    </MainWrapper>
  );
};
