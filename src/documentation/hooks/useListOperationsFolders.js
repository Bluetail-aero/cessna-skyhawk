/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { useMutation } from '@tanstack/react-query';
import { postApi } from 'common/fetch';
import { useAuthStore } from 'login/hooks/useAuthStore';
import { useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

// /operations/list_folders is a POST that takes no body — the company is inferred from the
// OAuth token. We post an empty object so the JSON Content-Type header still applies.
const listOperationsFolders = async (token) => postApi('/operations/list_folders', {}, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const useListOperationsFolders = () => {
  const { accessToken, logout } = useAuthStore();
  const toastId = useRef(null);

  const tokenizedApi = useCallback(() => listOperationsFolders(accessToken), [accessToken]);

  const mutation = useMutation({
    mutationFn: tokenizedApi,
    // eslint-disable-next-line no-unused-vars
    onError: (error, variables, context) => {
      if (error.response?.status === 401) {
        logout();
      } else {
        toastId.current = toast.error(error?.data?.message || 'Unknown Error', { autoClose: false });
      }
    },
  });

  return mutation;
};
