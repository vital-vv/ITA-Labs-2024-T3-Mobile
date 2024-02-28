import {AppText} from '../../components/appText/appText';
import {setPadding} from '../../utils/styling/padding';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import { BetStackParams } from '../../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ROUTES} from '../../constants/routes.ts';
import {FC, useState} from 'react';
import {useGetLotsInSubCategoryQuery} from '../../api/endpoints';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import { Pressable, RefreshControl, View } from 'react-native';
import { TEXT_VARIANT } from '../../types/textVariant.ts';
import { Colors } from '../../constants/colors.tsx';
import styles from './betsScreenStyles.ts';
import {FlashList} from '@shopify/flash-list';
import { ListItem } from '../../components/listItem/ListItem.tsx';

type Props = NativeStackScreenProps<BetStackParams, ROUTES.Bets>;

export const BetsScreen: FC<Props> = ({navigation, route}) => {
  
  const [isActiveFirst, setIsActiveFirst] = useState(true);
  
  const {
    data: lotsInSubCategoryData,
    isLoading,
    refetch: refetchlotsInSubCategory,
  } = useGetLotsInSubCategoryQuery(1);

  const {
    data: lot2sInSubCategoryData,
    isLoading: isLot2Loading,
    refetch: refetchlot2sInSubCategory,
  } = useGetLotsInSubCategoryQuery(2);

  if (isLoading) return <SpinnerWrapper />;

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
              refreshing={isLoading}
              onRefresh={refetchlotsInSubCategory}
            />
          }
          data={lotsInSubCategoryData?.content}
          renderItem={({item}) => (
            <Pressable
              style={{...setPadding(0, 16, 0, 16)}}
              onPress={() => {
                navigation.navigate(ROUTES.BetView, {
                  id: item.lot_id,
                  headerTitle: item.category_name,
                  position:'leading',
                });
              }}
              >
              <ListItem lot={item} position='leading'/>
            </Pressable>
          )}
        />) : 
        <FlashList 
          estimatedItemSize={300}
          refreshControl={
            <RefreshControl
              refreshing={isLot2Loading}
              onRefresh={refetchlot2sInSubCategory}
            />
          }
          data={lot2sInSubCategoryData?.content}
          renderItem={({item}) => (
            <Pressable
              style={{...setPadding(0, 16, 0, 16)}}
              onPress={() => {
                navigation.navigate(ROUTES.BetView, {
                  id: item.lot_id,
                  headerTitle: item.category_name,
                  position:'outbid',
                });
              }}
              >
              <ListItem lot={item} position='outbid'/>
            </Pressable>
          )}
        />
      }
    </MainWrapper>
  );
};
