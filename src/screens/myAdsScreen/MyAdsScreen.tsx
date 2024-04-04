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

type Props = NativeStackScreenProps<MyAdsStackParams, ROUTES.MyAds>;

export const MyAdsScreen: FC<Props> = ({navigation, route}) => {
  const [isActive, setIsActive] = useState(1);
  
  const {
    data: myActiveAdsData,
    isLoading: isLoadingActiveAds,
    refetch: refetchGetUserActiveAds,
  } = useGetUserAdsQuery({status: [
    StatusInResponce.Active]});

  const {
    data: myPendingAdsData,
    isLoading: isLoadingPendingAds,
    refetch: refetchGetUserPendingAds,
  } = useGetUserAdsQuery({status: [
    StatusInResponce.Moderated, 
    StatusInResponce.Cancelled
  ]});

  const {
    data: myInactiveAdsData,
    isLoading: isLoadingInactiveAds,
    refetch: refetchGetUserInactiveAds,
  } = useGetUserAdsQuery({status: [
    StatusInResponce.Expired,
    StatusInResponce.Sold,
    StatusInResponce.Deactivated,
    StatusInResponce.Auction_ended,
  ]});

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
              setIsActive(item.number);
            }}
            style={[styles.button, (isActive === item.number) && styles.button_pressed]}>
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
              refreshing={isActive === 1 ? isLoadingActiveAds :
                isActive === 2 ? isLoadingPendingAds :
                isLoadingInactiveAds}
              onRefresh={isActive === 1 ? refetchGetUserActiveAds :
                isActive === 2 ? refetchGetUserPendingAds :
                refetchGetUserInactiveAds}
            />
          }
          data={isActive === 1 ? myActiveAdsData?.content :
            isActive === 2 ? myPendingAdsData?.content :
            myInactiveAdsData?.content}
          renderItem={({item}) => (
            <Pressable
              style={{...setPadding(0, 16, 0, 16)}}
              onPress={() => {
                navigation.navigate(ROUTES.MyAdView, {
                  id: item.lot_id,
                  headerTitle: item.title || '',
                  position: isActive === 1 ? 'active' :
                  isActive === 2 ? 'pending' :
                  'expired'
                });
              }}>
              <MyAdsItem
                lot={item}
              />
            </Pressable>
          )}
      />
    </MainWrapper>
  );
};
