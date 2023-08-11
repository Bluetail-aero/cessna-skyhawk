// Error Boundaries need to be a class component as of 4/3/2023. This may change in the future.
/** @jsxImportSource @emotion/react */
import { Component } from 'react';
import { css } from '@emotion/react';
import { Button } from '@mui/material';

const styles = {
  backdrop: css({
    height: '100vh',
    width: '100%',
  }),
  button: css({
    fontWeight: 800,
    textDecoration: 'underline',
  }),
  container: css({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    justifyContent: 'center',
    maxWidth: '40%',
    minWidth: '25rem',
    textAlign: 'center',
    margin: 'auto auto',
    height: '100vh',

    h1: {
      fontSize: '5rem',
      fontWeight: 800,
    },
    h2: {
      fontSize: '3rem',
    },
  }),
  logo: css({
    height: '7rem',
    marginBottom: '1.5rem',
  }),
  reference: css({
    marginTop: '1rem',
    fontSize: '0.75rem',
  }),
};

export default class TopErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.onClickIgnore = this.onClickIgnore.bind(this);
    this.state = {
      hasError: false,
    };
  }

  static onClickRefresh() {
    window.location.reload();
  }

  onClickIgnore() {
    this.setState({
      hasError: false,
    });
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div css={styles.backdrop}>
          <div css={styles.container}>
            <h3>Sorry, there&apos;s been a critical, unhandled error.</h3>
            <p>
              Due to this error, there is a small chance the application is now unstable. Please click one of the buttons below to either refresh
              the application, or try to ignore the error and continue using the application.
            </p>
            <div>
              <Button
                onClick={TopErrorBoundary.onClickRefresh}
              >
                Refresh
              </Button>
              <Button
                onClick={this.onClickIgnore}
              >
                Ignore
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}
