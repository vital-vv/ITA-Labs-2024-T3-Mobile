import {Pressable, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppText} from '../../components/appText/appText';
import {ROUTES} from '../../constants/routes';
import {HomeStackParams} from '../../types/navigation';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {useGetCategoryQuery} from '../../api/endpoints';
import {FC} from 'react';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {setPadding} from '../../utils/styling/padding';
import {setMargin} from '../../utils/styling/margin';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {SubCategory} from '../../types/api/lots';

type Props = NativeStackScreenProps<HomeStackParams, ROUTES.Variety>;
export const VarietyScreen: FC<Props> = ({route, navigation}) => {
  const {id} = route.params;
  const {
    data: categoriesData,
    isLoading,
    refetch: refetchCategoriesData,
  } = useGetCategoryQuery(id);

  const renderItems: ListRenderItem<SubCategory> = ({item}) => (
    <Pressable
      onPress={() => {
        navigation.navigate(ROUTES.LotList, {
          id: item.category_id,
          headerTitle: `${item.name} lots`,
        });
      }}>
      <AppText text={`${item.name}`} style={setPadding(10, 16, 10, 16)} />
    </Pressable>
  );

  if (isLoading) return <SpinnerWrapper />;

  return (
    <MainWrapper>
      <MainWrapper style={setMargin(8, 0, 0, 0)}>
        <FlashList
          data={categoriesData?.subcategories}
          estimatedItemSize={200}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetchCategoriesData}
            />
          }
          renderItem={renderItems}
        />
      </MainWrapper>
    </MainWrapper>
  );
};
