/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import JSONPrettyMon from 'react-json-pretty/dist/monikai';
import JSONPretty from 'react-json-pretty';
import { useListAircraft } from 'documentation/hooks/useListAircraft';
import { Button } from '@mui/material';
import { useCallback } from 'react';

const styles = {
  section: css({
    marginBottom: '2rem',
    marginTop: '1rem',
  }),
  jsonInput: css({
    '& > div > span > span': {
      fontSize: '16px',
    }
  }),
  submitButton: css({
    marginTop: '2rem',
  }),
  resultHeader: css({
    fontSize: '1.5rem',
    fontWeight: 'bold',
  }),
  jsonResult: css({
    marginTop: '1rem',
    marginBottom: '1rem',
  }),
};

function View({
  doSubmit,
  resultJson,
}) {
  return (
    <div>
      <form css={styles.section} onSubmit={doSubmit}>
        <Button css={styles.submitButton} variant="contained" type="submit">Try it!</Button>
      </form>
      {resultJson && (
      <div css={styles.section}>
        <div css={styles.resultHeader}>Result</div>
        <JSONPretty
          data={resultJson}
          css={styles.jsonResult}
          theme={JSONPrettyMon}
        />
      </div>
      )}
    </div>
  );
}

function Model() {
  const mutation = useListAircraft();
  const resultJson = mutation?.data?.data?.data || null;

  const doSubmit = useCallback((event) => {
    event.preventDefault();

    mutation.mutate();
  }, [mutation]);

  const hookProps = {
    doSubmit,
    resultJson,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
export { View };
