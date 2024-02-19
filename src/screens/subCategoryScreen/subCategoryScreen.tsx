import {Pressable, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppText} from '../../components/appText/appText';
import {ROUTES} from '../../constants/routes';
import {HomeStackParams} from '../../types/navigation';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {useGetCategoryQuery} from '../../api/endpoints';
import {FC} from 'react';
import {FlashList} from '@shopify/flash-list';
import {setPadding} from '../../utils/styling/padding';
import {setMargin} from '../../utils/styling/margin';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';

type Props = NativeStackScreenProps<HomeStackParams, ROUTES.SubCategory>;
export const SubCategoryScreen: FC<Props> = ({route, navigation}) => {
  const {subCategory} = route.params;
  const {
    data: categoriesData,
    isLoading,
    refetch: refetchCategoriesData,
  } = useGetCategoryQuery(subCategory);

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
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                navigation.navigate(ROUTES.LotList, {
                  subCategory: item.category_id,
                  headerTitle: item.name,
                });
              }}>
              <AppText
                text={`${item.name}`}
                style={setPadding(10, 16, 10, 16)}
              />
            </Pressable>
          )}
        />
      </MainWrapper>
    </MainWrapper>
  );
};
