/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import JSONPrettyMon from 'react-json-pretty/dist/monikai';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import JSONPretty from 'react-json-pretty';
import { useSwitchAccount } from 'documentation/hooks/useSwitchAccount';
import { Button } from '@mui/material';
import { useCallback, useState } from 'react';

const defaultJson = {
  account_id: 0,
};

const styles = {
  section: css({
    marginBottom: '2rem',
    marginTop: '1rem',
  }),
  jsonInput: css({
    '& > div > span > span': {
      fontSize: '16px',
    },
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
  hint: css({
    marginBottom: '1rem',
    color: '#555',
    fontStyle: 'italic',
  }),
};

function View({
  doSubmit,
  doChange,
  resultJson,
}) {
  return (
    <div>
      <div css={styles.hint}>
        Enter the
        {' '}
        <code>account_id</code>
        {' '}
        (company_id) of the account to switch to —
        you can find candidates by hitting
        {' '}
        <strong>Get My Accounts</strong>
        {' '}
        first.
        On success the harness swaps its access + refresh tokens so subsequent calls
        run against the new account.
      </div>
      <form css={styles.section} onSubmit={doSubmit}>
        <JSONInput
          id="a_unique_id"
          placeholder={defaultJson}
          locale={locale}
          height="200px"
          width="100%"
          onChange={doChange}
          style={{ body: { fontSize: '16px' } }}
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
  const mutation = useSwitchAccount();
  // The auth service returns { access_token, refresh_token, expires_in } directly —
  // there's no public-api-style `data` envelope, so only two .data hops, not three.
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
