import {Pressable, RefreshControl} from 'react-native';
import {AppText} from '../../components/appText/appText.tsx';
import {TEXT_VARIANT} from '../../types/textVariant.ts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ProductCategory} from '../../components/productCategory/productCategory.tsx';
import {HorizontalDivider} from '../../components/horizontalDivider/horizontalDivider.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../types/navigation.ts';
import {ROUTES} from '../../constants/routes.ts';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper.tsx';
import {FlashList} from '@shopify/flash-list';
import {useGetAllCategoriesQuery} from '../../api/endpoints/index.ts';
import {FC} from 'react';
import {setPadding} from '../../utils/styling/padding.ts';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper.tsx';

type Props = NativeStackScreenProps<RootStackParams, ROUTES.Home>;

export const HomeScreen: FC<Props> = ({navigation, route}) => {
  const {
    data: allCategoriesData,
    isLoading,
    refetch: refetchAllCategoriesData,
  } = useGetAllCategoriesQuery();
  console.log(allCategoriesData);

  if (isLoading) return <SpinnerWrapper />;
  return (
    <MainWrapper>
      <AppText
        text={'Categories'}
        color={Colors.AGROEX_MAIN}
        variant={TEXT_VARIANT.MAIN_24_400}
        style={{...setPadding(20, 16, 24, 16)}}
      />
      <FlashList
        data={allCategoriesData}
        estimatedItemSize={200}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetchAllCategoriesData}
          />
        }
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              navigation.navigate(ROUTES.SubCategory, {
                subCategory: item.category_id,
                headerTitle: item.name,
              });
            }}>
            <ProductCategory categoryTitle={item.name} />
            <HorizontalDivider />
          </Pressable>
        )}
      />
    </MainWrapper>
  );
};
