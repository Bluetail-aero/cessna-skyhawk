/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@mui/material/Button';

const styles = {
  center: css({
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    display: 'flex',
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
    marginTop: '1.5rem',
  }),
};

function View({ onClick }) {
  return (
    <div css={styles.center}>
      <div css={styles.container}>
        <h1 css={styles.title}>💥 BOOM 💥</h1>
        <p css={styles.subheader}>Bluetail Organize and Optimize Module</p>
        <Button variant="contained" css={styles.loginButton} onClick={onClick}>Login Using Bluetail</Button>
      </div>
    </div>
  );
}

function Model() {
  const onClick = () => {
    window.location.href = `${process.env.REACT_APP_API_DOMAIN}/users/oauth/login`;
  };

  const hookProps = {
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
