import {Pressable, View, RefreshControl} from 'react-native';
import {ListItem} from '../../components/listItem/ListItem';
import {styles} from './lotListScreenStyles';
import {FC} from 'react';
import {FlashList} from '@shopify/flash-list';
import {RootStackParams} from '../../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ROUTES} from '../../constants/routes';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {useGetLotsInSubCategoryQuery} from '../../api/endpoints';
import {TEXT_VARIANT} from '../../types/textVariant';
import {AppText} from '../../components/appText/appText';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {setPadding} from '../../utils/styling/padding';

type Props = NativeStackScreenProps<RootStackParams, ROUTES.LotList>;

export const LotListScreen: FC<Props> = ({navigation, route}) => {
  const {subCategory} = route.params;
  const {
    data: lotsInSubCategoryData,
    isLoading,
    refetch: refetchlotsInSubCategory,
  } = useGetLotsInSubCategoryQuery(2);

  if (isLoading) return <SpinnerWrapper />;
  return (
    <MainWrapper style={{...setPadding(0, 16, 0, 16)}}>
      <View style={styles.sort__block}>
        <Pressable style={styles.sort__button}>
          <AppText text={'Popular lots'} variant={TEXT_VARIANT.MAIN_16_400} />
        </Pressable>
        <Pressable style={styles.sort__button}>
          <AppText text={'Best price'} variant={TEXT_VARIANT.MAIN_16_400} />
        </Pressable>
        <Pressable style={styles.sort__button}>
          <AppText text={'New lots'} variant={TEXT_VARIANT.MAIN_16_400} />
        </Pressable>
      </View>
      <FlashList
        estimatedItemSize={300}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetchlotsInSubCategory}
          />
        }
        data={lotsInSubCategoryData}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              navigation.navigate(ROUTES.Lot, {
                id: item.lot_id,
                headerTitle: item.title,
              });
            }}>
            <ListItem lot={item} />
          </Pressable>
        )}
      />
    </MainWrapper>
  );
};
