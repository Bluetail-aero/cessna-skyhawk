/* eslint-disable max-len */
import { useMutation } from '@tanstack/react-query';
// import { queryClient } from 'common/const/queryClient';
import { postApi } from 'common/fetch';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const signIn = async ({ secret, authCode }) => {
  const data = {
    grant_type: 'authorization_code',
    code: authCode,
    redirect_uri: process.env.REACT_APP_OAUTH_REDIRECT_URL,
  };

  const formBody = [];

  Object.entries(data).forEach(([key, value]) => {
    const encodedKey = key;
    const encodedValue = value;
    formBody.push(`${encodedKey}=${encodedValue}`);
  });

  return postApi(`${process.env.REACT_APP_OAUTH_SERVER}/oauth/access_token`, formBody.join('&'), {
    external: true,
    noJSON: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${process.env.REACT_APP_OAUTH_CLIENT_ID}:${secret}`)}`,
    },
  });
};

export const useSignIn = ({ onMutate, onError } = {}) => {
  const toastId = useRef(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signIn,
    // eslint-disable-next-line no-unused-vars
    onMutate: (variables) => {
      if (onMutate) {
        onMutate();
      }
    },
    // eslint-disable-next-line no-unused-vars
    onError: (error, variables, context) => {
      toastId.current = toast.error(error?.data?.msg || error?.data?.error_description || 'Invalid Secret', { autoClose: false });
      navigate('/');

      if (onError) {
        onError(variables);
      }
    },
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data, variables, context) => {

    },
  });

  return mutation.mutate;
};
