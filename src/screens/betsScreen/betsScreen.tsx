import {AppText} from '../../components/appText/appText';
import {setPadding} from '../../utils/styling/padding';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import { BetStackParams } from '../../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ROUTES} from '../../constants/routes.ts';
import {FC, useState} from 'react';
import {useGetUserBetsQuery, useGetLotQuery} from '../../api/endpoints';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {Pressable, RefreshControl, View} from 'react-native';
import {TEXT_VARIANT} from '../../types/textVariant.ts';
import {Colors} from '../../constants/colors.tsx';
import styles from './betsScreenStyles.ts';
import {FlashList} from '@shopify/flash-list';
import {ListItem} from '../../components/listItem/ListItem.tsx';
import { number } from 'yup';

type Props = NativeStackScreenProps<BetStackParams, ROUTES.Bets>;

export const BetsScreen: FC<Props> = ({navigation, route}) => {
  
  const [isActiveFirst, setIsActiveFirst] = useState(true);
  let id:number = 0
  
  const {
    data: userLeadingBetsData,
    isLoading: isLoadingLeadingBets,
    refetch: refetchGetUserLeadingBets,
  } = useGetUserBetsQuery('LEADING');

  const {
    data: userOverbidBetsData,
    isLoading: isLoadingOverbidBets,
    refetch: refetchGetUserOverbidBets,
  } = useGetUserBetsQuery('OVERBID');

  const {
    data: LotData,
    isLoading: isLoadingLotData,
    refetch: refetchLotData,
  } = useGetLotQuery(id);
  

  if (isLoadingLeadingBets && isLoadingOverbidBets) return <SpinnerWrapper />;

  return (
    <MainWrapper>
      <View style={styles.button_wrapper}>
        <Pressable 
        onPress={() => {setIsActiveFirst(!isActiveFirst);
      }}
        style={ isActiveFirst ? [styles.button, styles.button_pressed] : styles.button}
        >
          <AppText
            text={'My bets'}
            variant={TEXT_VARIANT.MAIN_18_500}
            color={Colors.PRIMARY}
            style={setPadding(10, 16, 10, 16)}
          />
        </Pressable>
        <Pressable
          onPress={() => {setIsActiveFirst(!isActiveFirst);
        }}
          style={ !isActiveFirst ? [styles.button, styles.button_pressed] : styles.button}
          >
          <AppText
            text={'Outbid'}
            variant={TEXT_VARIANT.MAIN_18_500}
            color={Colors.PRIMARY}
            style={setPadding(10, 16, 10, 16)}
          />
        </Pressable>
      </View>
      {isActiveFirst ? (
        <FlashList 
          estimatedItemSize={300}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingLeadingBets}
              onRefresh={refetchGetUserLeadingBets}
            />
          }
          data={userLeadingBetsData?.content}
          renderItem={({item}) => (useGetLotQuery(item.lot_id) &&
            <Pressable
              style={{...setPadding(0, 16, 0, 16)}}
              onPress={() => {
                navigation.navigate(ROUTES.BetView, {
                  id: LotData?.lot_id || 0,
                  // headerTitle: item.category_name,
                  headerTitle: LotData?.title || '',
                  position:'leading',
                });
              }}
              >
              <ListItem lot={LotData} position='leading'/>
            </Pressable>
          )}
        />) : 
        <FlashList 
          estimatedItemSize={300}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingOverbidBets}
              onRefresh={refetchGetUserOverbidBets}
            />
          }
          data={userOverbidBetsData?.content}
          renderItem={({item}) => (useGetLotQuery(item.lot_id) &&
            <Pressable
              style={{...setPadding(0, 16, 0, 16)}}
              onPress={() => {
                navigation.navigate(ROUTES.BetView, {
                  id: LotData?.lot_id || 0,
                  // headerTitle: item.category_name,
                  headerTitle: LotData?.title || '',
                  position:'outbid',
                });
              }}
              >
              <ListItem lot={LotData} position='outbid'/>
            </Pressable>
          )}
        />
      }
    </MainWrapper>
  );
};
