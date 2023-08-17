/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Center from 'common/components/Center';

const styles = {
  container: css({
    width: '100%',
    height: '200px',
    border: '2px dashed #ccc',
    marginTop: '1rem',
    cursor: 'pointer',
  }),
};

function View({
  getRootProps,
  getInputProps,
  isDragActive,
}) {
  return (
    <div
      css={styles.container}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {
    isDragActive
      ? <Center>Drop the files here ...</Center>
      : <Center>Click me or drag files to me!</Center>
  }
    </div>
  );
}

export default View;
