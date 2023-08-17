/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import JSONPrettyMon from 'react-json-pretty/dist/monikai';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import JSONPretty from 'react-json-pretty';
import { useRequestUpload } from 'documentation/hooks/useRequestUpload';
import { Button } from '@mui/material';
import { useCallback, useState } from 'react';

const defaultJson = {
  tail_number: 'N1000N',
  serial_number: '310H0104',
  file_name: 'Frenchie_310H0104_2021-09-30_10-00-00.pdf',
  prevent_duplicates: false,
};

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
  doChange,
  resultJson,
}) {
  return (
    <div>
      <form css={styles.section} onSubmit={doSubmit}>
        <JSONInput
          id="a_unique_id"
          placeholder={defaultJson}
          locale={locale}
          height="500px"
          width="100%"
          onChange={doChange}
          style={{ body: { fontSize: '16px', }, }}
        />
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
  const [json, setJson] = useState(defaultJson);
  const mutation = useRequestUpload();
  const resultJson = mutation?.data?.data || null;

  // https://www.npmjs.com/package/react-json-editor-ajrm
  const doChange = useCallback(({ jsObject }) => {
    setJson(jsObject);
  }, []);

  const doSubmit = useCallback((event) => {
    event.preventDefault();

    mutation.mutate(json);
  }, [json, mutation]);

  const hookProps = {
    doSubmit,
    doChange,
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
