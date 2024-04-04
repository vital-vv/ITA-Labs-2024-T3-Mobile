import {fetchAuthSession} from 'aws-amplify/auth';
import {
  useLazyGetCurrentUserQuery,
  useLazyGetUserAvatarQuery,
} from '../../api/endpoints';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selector} from '../../store/selector';
import {currentUserActions} from '../../store/slices/currentUserSlice';
import {useEffect} from 'react';

export const useInitializeUserSession = () => {
  const {isInitializing, avatarId} = useAppSelector(
    selector.currentUserSliceData,
  );
  const [getCurrentUserQueryTrigger] = useLazyGetCurrentUserQuery();
  const dispatch = useAppDispatch();
  const [getCurrentUserAvatarTrigger] = useLazyGetUserAvatarQuery();

  const isTokenValid = async () => {
    const userSessionData = await fetchAuthSession({forceRefresh: true});
    if (!userSessionData.tokens?.idToken?.toString()) {
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

  const checkUserAvatar = () => {
    if (avatarId) {
      getCurrentUserAvatarTrigger(avatarId);
    } else {
      dispatch(currentUserActions.setCurrentUserAvatarURL(''));
    }
  };

  useEffect(() => {
    initializeSession();
  }, []);

  //subscribe to update of profile URL
  useEffect(() => {
    checkUserAvatar();
  }, [avatarId]);

  return {isInitializing};
};
