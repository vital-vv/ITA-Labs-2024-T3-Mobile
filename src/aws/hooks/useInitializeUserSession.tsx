import {fetchAuthSession} from 'aws-amplify/auth';
import {useLazyGetCurrentUserQuery} from '../../api/endpoints';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selector} from '../../store/selector';
import {currentUserActions} from '../../store/slices/currentUserSlice';
import {useEffect} from 'react';

export const useInitializeUserSession = () => {
  const {isInitializing} = useAppSelector(selector.currentUserSliceData);
  const [getCurrentUserQueryTrigger] = useLazyGetCurrentUserQuery();
  const dispatch = useAppDispatch();

  const isTokenValid = async () => {
    const userSessionData = await fetchAuthSession({forceRefresh: true});
    if (!userSessionData.tokens?.idToken) {
      throw new Error('SESSION_EXPIRED');
    }
  };

  const initializeSession = async () => {
    try {
      await isTokenValid();
      await getCurrentUserQueryTrigger();
    } catch (e) {
      dispatch(currentUserActions.setCurrentUserAsGuest());
    }
  };

  useEffect(() => {
    initializeSession();
  }, []);

  return {isInitializing};
};
