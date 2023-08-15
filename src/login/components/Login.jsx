/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useCallback } from 'react';
import { useAuthStore } from 'login/hooks/useAuthStore';

const styles = {
  center: css({
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    display: 'flex',
    '& .MuiFormControl-root': {
      width: '450px',
      margin: '0.5rem',
    }
  }),
  container: css({
    textAlign: 'center',
  }),
  title: css({
    fontSize: '3rem',
    lineHeight: '1',
  }),
  subheader: css({
    fontSize: '0.9rem',
    lineHeight: '1rem',
    marginTop: '1.5rem',
  }),
  loginButton: css({
    padding: '1rem',
    width: '300px',
    margin: '3rem',
  }),
};

function View({ onClick, secret, storeSecret }) {
  return (
    <div css={styles.center}>
      <div css={styles.container}>
        <h1 css={styles.title}>Public API</h1>
        <div>
          <TextField label="Secret" variant="standard" name="secret" onChange={storeSecret} value={secret} />
        </div>
        <div>
          <Button variant="contained" css={styles.loginButton} onClick={onClick} type="button">Login</Button>
        </div>
      </div>
    </div>
  );
}

function Model() {
  const { authSecret, setSecret } = useAuthStore();

  const storeSecret = useCallback((event) => {
    setSecret(event.target.value);
  }, [setSecret]);

  const onClick = useCallback(() => {
    window.location.href = `
      ${process.env.REACT_APP_OAUTH_SERVER}/oauth/authenticate?response_type=code&client_id=cessna_skyhawk&redirect_uri=${process.env.REACT_APP_OAUTH_REDIRECT_URL}&state=none
    `;
  }, []);

  const hookProps = {
    secret: authSecret,
    storeSecret,
    onClick,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
export { View };
