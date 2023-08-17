/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/system';

const styles = {
  container: css({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};

function View({
  children,
  ...props
}) {
  return (
    <Box css={styles.container} {...props}>
      {children}
    </Box>
  );
}

export default View;
