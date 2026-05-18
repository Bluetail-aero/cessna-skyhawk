/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { useMutation } from '@tanstack/react-query';
import { postApi } from 'common/fetch';
import { useAuthStore } from 'login/hooks/useAuthStore';
import { useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

// switch_account lives on the auth service, not public-api — same external-call pattern
// useSignIn already uses for /oauth/access_token. `external: true` tells BluetailAPI to
// skip the REACT_APP_PUBLIC_API prefix and hit the full URL we're passing in.
const switchAccount = async (token, body) => postApi(`${process.env.REACT_APP_OAUTH_SERVER}/oauth/switch_account`, body, {
  external: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const useSwitchAccount = () => {
  const { accessToken, setTokens, logout } = useAuthStore();
  const toastId = useRef(null);

  const tokenizedApi = useCallback((body) => switchAccount(accessToken, body), [accessToken]);

  const mutation = useMutation({
    mutationFn: tokenizedApi,
    // eslint-disable-next-line no-unused-vars
    onSuccess: (result, variables, context) => {
      const newAccessToken = result?.data?.access_token;
      const newRefreshToken = result?.data?.refresh_token;
      if (newAccessToken && newRefreshToken) {
        // Swap the harness's tokens so subsequent calls hit the target account.
        // The originally-presented bearer remains valid on the auth side (parity
        // with the web switchAccount flow); we just stop using it here.
        setTokens(newAccessToken, newRefreshToken);
        toastId.current = toast.success('Switched account. Token swapped.', { autoClose: 3000 });
      }
    },
    // eslint-disable-next-line no-unused-vars
    onError: (error, variables, context) => {
      if (error.response?.status === 401) {
        logout();
      } else {
        toastId.current = toast.error(error?.data?.message || error?.data?.error_description || 'Unknown Error', { autoClose: false });
      }
    },
  });

  return mutation;
};
