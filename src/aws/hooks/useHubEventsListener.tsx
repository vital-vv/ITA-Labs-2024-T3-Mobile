import {useEffect} from 'react';
import {useLazyGetCurrentUserQuery} from '../../api/endpoints';
import {ROUTES} from '../../constants/routes';
import {useAppDispatch} from '../../store/hooks';
import {currentUserActions} from '../../store/slices/currentUserSlice';
import {useAppNavigation} from '../../utils/hooks/useAppNavigation';
import {Hub} from 'aws-amplify/utils';
import {hubAuthEvents} from '../../constants/amplifyHubEvents';

export const useHubEventsListener = () => {
  const [getCurrentUserQueryTrigger] = useLazyGetCurrentUserQuery();
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const checkUserData = async () => {
    await getCurrentUserQueryTrigger();
    navigation.navigate(ROUTES.HomeStack, {
      screen: ROUTES.Home,
    });
  };

  const resetOnRefreshFailure = () => {
    dispatch(currentUserActions.setCurrentUserAsGuest());
    navigation.navigate(ROUTES.HomeStack, {screen: ROUTES.Home});
  };

  useEffect(() => {
    const hubListener = Hub.listen('auth', async ({payload}) => {
      if (payload.event === hubAuthEvents.signedIn) {
        checkUserData();
      }
      if (payload.event === hubAuthEvents.tokenRefresh_failure) {
        resetOnRefreshFailure();
      }
    });

    //unsubscribe
    return () => hubListener();
  });
};
