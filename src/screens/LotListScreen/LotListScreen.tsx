import {
  Pressable,
  View,
  RefreshControl,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {ListItem} from '../../components/listItem/ListItem';
import {styles} from './lotListScreenStyles';
import {FC, useRef, useState} from 'react';
import {HomeStackParams} from '../../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ROUTES} from '../../constants/routes';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {useGetLotsInSubCategoryQuery} from '../../api/endpoints';
import {TEXT_VARIANT} from '../../types/textVariant';
import {AppText} from '../../components/appText/appText';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {setPadding} from '../../utils/styling/padding';
import FilterIcon from '../../assets/icons/filter.svg';
import {Colors} from '../../constants/colors';
import {Lot} from '../../types/api/lots';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selector} from '../../store/selector';
import {filterActions} from '../../store/slices/filterOptionsSlice';

type Props = NativeStackScreenProps<HomeStackParams, ROUTES.LotList>;

export const LotListScreen: FC<Props> = ({navigation, route}) => {
  const {id} = route.params;
  const dispatch = useAppDispatch();
  const filterState = useAppSelector(selector.filterOptionsSlice);

  const filterPackaging = filterState.packaging
    .map(item => `&packaging=${item}`)
    .join('');

  const mainSortField = filterState.mainSortField
    ? `&sortField=${filterState.mainSortField}`
    : '';
  const sortOrder = filterState.sortOrder
    ? `&sortOrder=${filterState.sortOrder}`
    : '';
  const fromPrice = filterState.fromPrice
    ? `&fromPrice=${filterState.fromPrice}`
    : '';
  const toPrice = filterState.toPrice ? `&toPrice=${filterState.toPrice}` : '';
  const price = fromPrice && toPrice ? fromPrice + toPrice : '';
  const queryParams = {
    id: id,
    page: filterState.page,
    limit: filterState.itemsPerPage,
    filterArgs: filterPackaging + mainSortField + sortOrder + price,
  };

  const {
    data: infiniteLotsList,
    isLoading,
    isFetching,
  } = useGetLotsInSubCategoryQuery({
    ...queryParams,
  });

  const onEndOfListIsReached = () => {
    if (infiniteLotsList?.isNextPage) {
      dispatch(filterActions.setNextPage());
    }
  };
  const refetchToInitialPage = () => {
    dispatch(filterActions.setFilterOptions({...filterState, page: 1}));
  };
  const onPressFilterOptions = () => {
    navigation.navigate(ROUTES.LotsFilter);
  };

  const renderItems: ListRenderItem<Lot> = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate(ROUTES.Lot, {
            id: item.lot_id,
            headerTitle: item.title,
          });
        }}>
        <ListItem
          image_url={item.image_url.length ? item.image_url[0].url : undefined}
          title={item.title}
          expiration_date={item.expiration_date}
          lot_id={item.lot_id}
          total_price={item.total_price}
          price_per_unit={item.price_per_unit}
          currency={item.currency}
          amount={item.leading ? item.leading.amount : 0}
          weight={item.weight}
          quantity={item.quantity}
        />
      </Pressable>
    );
  };

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
      {infiniteLotsList && (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetchToInitialPage} />
        }
        data={infiniteLotsList?.lots}
        renderItem={renderItems}
        onEndReachedThreshold={0.6}
        onEndReached={onEndOfListIsReached}
      />
      )}
      {isLoading || isFetching ? 
      <View style={{paddingVertical: 25, flex: 1, justifyContent: 'center', }}>
        <SpinnerWrapper text="Loading..." /> 
      </View> : null}
      <Pressable style={styles.filter} onPress={onPressFilterOptions}>
        <FilterIcon fill={Colors.WHITE} />
      </Pressable>
    </MainWrapper>
  );
};
