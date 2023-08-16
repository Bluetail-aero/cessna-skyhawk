/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import JSONPretty from 'react-json-pretty';
import { useListAircraftFolders } from 'documentation/hooks/useListAircraftFolders';
import { Button, TextField } from '@mui/material';
import { useCallback } from 'react';

const styles = {
  section: css({
    marginBottom: '2rem',
    marginTop: '1rem',
  }),
  apiParam: css({
    width: '100%',
    marginLeft: '.5rem',
  }),
  submitButton: css({
    marginTop: '2rem',
  }),
};

function View({
  doSubmit,
}) {
  return (
    <div>
      <form css={styles.section} onSubmit={doSubmit}>
        <TextField
          css={styles.apiParam}
          label="Aircraft (ex. N10009-79-032, NBT500-5531, N770X-60-336)"
          variant="standard"
          name="aircraftList"
        />
        <Button css={styles.submitButton} type="submit">Try it!</Button>
      </form>
      {true && (
      <div css={styles.section}>
        <JSONPretty data={{ test: 'yes' }} />
      </div>
      )}
    </div>
  );
}

function Model() {
  const mutation = useListAircraftFolders();

  console.log({ data: mutation?.data });

  const doSubmit = useCallback((event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { aircraftList } = Object.fromEntries(formData.entries());

    mutation.mutate(aircraftList);
  }, [mutation]);

  const hookProps = {
    doSubmit,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
export { View };
