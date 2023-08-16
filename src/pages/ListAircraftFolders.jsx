/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import JSONPretty from 'react-json-pretty';
import { useListAircraftFolders } from 'documentation/hooks/useListAircraftFolders';
import { Button } from '@mui/material';
import { useCallback, useState } from 'react';

const defaultJson = [
  {
    tail_number: 'N1000N',
    serial_number: '310H0104'
  },
  {
    tail_number: 'NBT500',
    serial_number: '5531'
  }
];

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
  jsonInput: css({
    '& > div > span > span': {
      fontSize: '16px',
    }
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
        <Button css={styles.submitButton} type="submit">Try it!</Button>
      </form>
      {resultJson && (
      <div css={styles.section}>
        <JSONPretty
          data={resultJson}
          css={styles.jsonResult}
        />
      </div>
      )}
    </div>
  );
}

function Model() {
  const [json, setJson] = useState(defaultJson);
  const mutation = useListAircraftFolders();
  const resultJson = mutation?.data?.data?.data || null;

  // https://www.npmjs.com/package/react-json-editor-ajrm
  const doChange = useCallback(({ jsObject }) => {
    debugger;
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
