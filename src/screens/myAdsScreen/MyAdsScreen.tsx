import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';
import {AccountStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {FC, useState} from 'react';
import {Status} from '../../types/api/info';
import {useGetUserAdsQuery} from '../../api/endpoints';

type Props = NativeStackScreenProps<AccountStackParams, ROUTES.MyAds>;

export const MyAdsScreen: FC<Props> = ({navigation, route}) => {
  const [isActiveFirst, setIsActiveFirst] = useState(true);
  
  const {
    data: myActiveAdsData,
    isLoading: isLoadingActiveAds,
    refetch: refetchGet,
  } = useGetUserAdsQuery(Status.Active);


  return (
    <MainWrapper>
      <AppText text={'MyAdsScreen'} style={setPadding(16, 16, 16, 16)} />
    </MainWrapper>
  );
};
