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
import {FilterOptionsModal} from './components/filterOptionsModal/filterOptionsModal';

type Props = NativeStackScreenProps<HomeStackParams, ROUTES.LotList>;

export const LotListScreen: FC<Props> = ({navigation, route}) => {
  const {subCategory} = route.params;
  const initialPage = 1;
  const initialQueryParams = {
    page: initialPage,
    limit: 10,
    filterArgs: '',
    id: subCategory,
  };
  const [queryParams, setQueryParams] = useState({...initialQueryParams});
  const {
    data: infiniteLotsList,
    isLoading,
    isFetching,
    refetch,
  } = useGetLotsInSubCategoryQuery({
    ...queryParams,
  });

  const onEndOfListIsReached = () => {
    if (infiniteLotsList?.isNextPageExist) {
      setQueryParams(prevState => {
        return {...prevState, page: prevState.page + 1};
      });
    } else return;
  };
  const refetchToInitialPage = () => {
    setQueryParams({...queryParams, page: initialQueryParams.page});
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
          title={item.title} 
          expiration_date={item.expiration_date} 
          lot_id={item.lot_id} 
          total_price={item.total_price}
          price_per_unit={item.price_per_unit}
          currency={item.currency} 
          amount={item.leading ? item.leading.amount : 0}
          weight={item.weight}/>
      </Pressable>
    );
  };
  const flatListRef = useRef<FlatList<Lot>>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <FlatList
        ref={flatListRef}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetchToInitialPage} />
        }
        data={infiniteLotsList?.lots}
        renderItem={renderItems}
        onEndReachedThreshold={0.6}
        onEndReached={onEndOfListIsReached}
      />
      {isLoading || isFetching ? <SpinnerWrapper text="Loading..." /> : null}
      <Pressable style={styles.filter} onPress={() => setIsModalOpen(true)}>
        <FilterIcon fill={Colors.WHITE} />
      </Pressable>
      <FilterOptionsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setQueryParams={setQueryParams}
        queryParams={queryParams}
      />
    </MainWrapper>
  );
};
