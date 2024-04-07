import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {selector} from '../../store/selector.ts';
import {useAppDispatch, useAppSelector} from '../../store/hooks/index.ts';
import {globalNavigate} from '../../navigation/globalNavigation.tsx';
import {ROUTES} from '../../constants/routes.ts';
import {AuthStatuses} from '../../types/auth.ts';
import {useEffect} from 'react';
import {amplifyAuthActions} from '../../store/slices/amplifyAuthSlice.ts.ts';

export const useAuthUIHandler = () => {
  const {authStatus, isTransitionInProgress} = useAppSelector(
    selector.amplifyAuthSliceData,
  );
  const {toSignIn, toSignUp} = useAuthenticator();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authStatus === AuthStatuses.SignIn) {
      toSignIn();
      dispatch(amplifyAuthActions.setTransitionState(false));
    }
    if (authStatus === AuthStatuses.SignUp) {
      toSignUp();
      dispatch(amplifyAuthActions.setTransitionState(false));
    }
  }, [authStatus, isTransitionInProgress]);
  return {isTransitionInProgress};
};
