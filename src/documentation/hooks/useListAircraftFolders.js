/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { useMutation } from '@tanstack/react-query';
// import { queryClient } from 'common/const/queryClient';
import { postApi } from 'common/fetch';
import { useAuthStore } from 'login/hooks/useAuthStore';
import { useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

const listAircraftFolders = async (token, aircraft) => postApi('/documents/list_aircraft_folders', {
  aircraft,
}, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const useListAircraftFolders = () => {
  const { accessToken, logout } = useAuthStore();
  const toastId = useRef(null);

  const tokenizedApi = useCallback((aircraftList) => listAircraftFolders(accessToken, aircraftList), [accessToken]);

  const mutation = useMutation({
    mutationFn: tokenizedApi,
    // eslint-disable-next-line no-unused-vars
    onError: (error, variables, context) => {
      if (error.response.status === 401) {
        logout();
      } else {
        toastId.current = toast.error(error?.data?.message || 'Unknown Error', { autoClose: false });
      }
    },
  });

  return mutation;
};
