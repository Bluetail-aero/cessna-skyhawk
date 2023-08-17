/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAuthStore } from 'login/hooks/useAuthStore';
import { useSignIn } from 'login/hooks/useSignIn';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const { authSecret, logout } = useAuthStore();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [searchParams] = useSearchParams();

  const authCode = searchParams.get('code');
  const isDenied = searchParams.get('outcome') === 'denied';

  useEffect(() => {
    if (isDenied) {
      toast.error('Access denied due to oauth denial.');
      logout();
      navigate('/');
    }
  }, [isDenied, logout, navigate]);

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
