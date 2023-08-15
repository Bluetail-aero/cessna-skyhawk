/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAuthStore } from 'login/hooks/useAuthStore';
import { useSignIn } from 'login/hooks/useSignIn';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

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
};

function View() {
  return (
    <div css={styles.center}>
      <div css={styles.container}>
        Logging In
      </div>
    </div>
  );
}

function Model() {
  const { authSecret } = useAuthStore();
  const signIn = useSignIn();
  const [searchParams] = useSearchParams();

  const authCode = searchParams.get('code');

  useEffect(() => {
    if (authSecret && authCode) {
      signIn({ secret: authSecret, authCode });
    }
  }, [authCode, authSecret, signIn]);

  const hookProps = {
    secret: authSecret,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
export { View };
