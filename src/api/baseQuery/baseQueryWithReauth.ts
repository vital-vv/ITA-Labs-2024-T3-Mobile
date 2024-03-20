import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import {Mutex} from 'async-mutex';
import {baseQuery} from './baseQuery';
import {fetchAuthSession} from 'aws-amplify/auth';
import {showToast} from '../../components/toasts';
import {ToastTypes} from '../../types/toasts';
import {currentUserActions} from '../../store/slices/currentUserSlice';
import {signOut} from 'aws-amplify/auth';

const mutex = new Mutex();

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  api.type.valueOf;
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  //check for unautorized error 401 for any request
  if (result.error && result.error.status === 401) {
    // Checking mutex for locking (update in progress)
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const updatedUserSessionData = await fetchAuthSession({
          forceRefresh: true,
        });
        if (updatedUserSessionData.tokens?.idToken?.payload.toString()) {
          //retry initial query with updated tokens
          result = await baseQuery(args, api, extraOptions);
        } else {
          await signOut();
          showToast(ToastTypes.Error);
          api.dispatch(currentUserActions.isLogout());
        }
      } finally {
        //next query is available
        release();
      }
    } else {
      //wait until mutex is unlocked
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
