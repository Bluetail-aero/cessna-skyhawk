import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { useFileUpload } from 'documentation/hooks/useFileUpload';
import Dropzone from 'common/components/Dropzone';
import { usePrevious } from 'common/hooks/usePrevious';
import { toast } from 'react-toastify';

function Model({ s3Url }) {
  const fileUpload = useFileUpload();

  // This implementation expects only a single file. Since this is a demo, I'm not worrying about coding protections for that, but be aware.
  const onDrop = useCallback(async (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      fileUpload({
        file,
        s3Url,
      });
    });
  }, [fileUpload, s3Url]);

  const {
    getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections
  } = useDropzone({
    onDrop,
    accept: {
      'image/jpg': [],
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/vnd.ms-excel': [],
      'application/vnd.ms-word': [],
      'text/csv': [],
    },
  });

  const previousRejected = usePrevious(fileRejections);

  useEffect(() => {
    if (
      (fileRejections?.length > 0 || acceptedFiles?.length > 0)
      && previousRejected !== fileRejections
    ) {
      if (fileRejections?.length > 0) {
        fileRejections.forEach(({ file, errors }) => {
          toast.error(`Client rejected ${file}, ${errors}`);
        });
      }
    }
  }, [acceptedFiles?.length, fileRejections, previousRejected]);

  const hookProps = {
    getRootProps,
    getInputProps,
    isDragActive,
  };

  return (
    <Dropzone
      {...hookProps}
    />
  );
}

export default Model;
