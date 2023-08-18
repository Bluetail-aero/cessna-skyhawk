import { useMutation } from '@tanstack/react-query';
import { putApi } from 'common/fetch';
import { toast } from 'react-toastify';

export const postFileUpload = async ({
  file, s3Url
}) => {
  const s3Response = await putApi(s3Url, file, {
    noJSON: true,
    external: true,
    headers: {
      'Content-Type': file.type,
    },
  });

  const { status } = s3Response?.response || {};

  if (status !== 200) {
    throw new Error('Failed to upload file to S3');
  }

  return s3Response;
};

export const useFileUpload = () => {
  const mutation = useMutation({
    mutationFn: postFileUpload,
    // eslint-disable-next-line no-unused-vars
    onError: (error, variables, context) => {
      toast.error(`Error uploading files to s3 --> ${error}`);
    },
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data, variables, context) => {
      toast.success(`Files successfully uploaded to ${variables.s3Url}`);
    },
  });

  return mutation.mutate;
};
