import {useEffect} from 'react';
import {useLazyGetCurrentUserQuery} from '../../api/endpoints';
import {ROUTES} from '../../constants/routes';
import {useAppDispatch} from '../../store/hooks';
import {currentUserActions} from '../../store/slices/currentUserSlice';
import {Hub} from 'aws-amplify/utils';
import {HubAuthEvents} from '../../constants/amplifyHubEvents';
import {globalNavigate} from '../../navigation/globalNavigation';

export const useHubEventsListener = () => {
  const [getCurrentUserQueryTrigger] = useLazyGetCurrentUserQuery();
  const dispatch = useAppDispatch();

  const resetOnRefreshFailure = () => {
    dispatch(currentUserActions.setCurrentUserAsGuest());
    globalNavigate(ROUTES.HomeStack, {screen: ROUTES.Home});
  };

  useEffect(() => {
    const hubListener = Hub.listen('auth', async ({payload}) => {
      if (payload.event === HubAuthEvents.signedIn) {
        await getCurrentUserQueryTrigger();
      }
      if (payload.event === HubAuthEvents.tokenRefresh_failure) {
        resetOnRefreshFailure();
      }
      if (payload.event === HubAuthEvents.signedOut) {
        dispatch(currentUserActions.isLogout());
      }
    });
    //unsubscribe to prevent memory leaking
    return () => hubListener();
  });
};
