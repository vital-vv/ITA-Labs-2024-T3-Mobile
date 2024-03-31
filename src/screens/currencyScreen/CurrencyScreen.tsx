import {FC} from 'react';
import {
  useEditUserMutation,
  useGetAllSelectionQuery,
} from '../../api/endpoints';
import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {ROUTES} from '../../constants/routes';
import {AccountStackParams} from '../../types/navigation';
import {setPadding} from '../../utils/styling/padding';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {FlashList} from '@shopify/flash-list';
import {Pressable, RefreshControl} from 'react-native';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import {transformValuesChangeCurrency} from '../../utils/helpers/transformValuesToRequestFunc';
import {CurrentUserStateType} from '../../store/slices/currentUserSlice';
import {Currency} from '../../types/api/info';
import {useAppSelector} from '../../store/hooks';
import {selector} from '../../store/selector';

type Props = NativeStackScreenProps<AccountStackParams, ROUTES.Currency>;

export const CurrencyScreen: FC<Props> = ({navigation, route}) => {
  const [editUserTrigger] = useEditUserMutation();
  const {
    data: allSelectionData,
    isLoading,
    refetch: refetchallSelectionData,
  } = useGetAllSelectionQuery();

  const user = useAppSelector(selector.currentUserSliceData);

  const onSubmit = (user: CurrentUserStateType, currency: Currency) => {
    const newValues = transformValuesChangeCurrency(user, currency);
    editUserTrigger(newValues);
  };

  if (isLoading) {
    return <SpinnerWrapper />;
  }

  return (
    <MainWrapper>
      <FlashList
        data={allSelectionData?.currency}
        estimatedItemSize={200}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetchallSelectionData}
          />
        }
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              onSubmit(user, item);
            }}>
            <AppText
              text={item}
              style={setPadding(10, 16, 10, 16)}
              variant={TEXT_VARIANT.MAIN_18_400}
              color={
                user.currency == item ? Colors.SELECTED_TAB_NAV : Colors.PRIMARY
              }
            />
          </Pressable>
        )}
      />
    </MainWrapper>
  );
};
