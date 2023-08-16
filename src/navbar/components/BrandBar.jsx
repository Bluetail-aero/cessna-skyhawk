/** @jsxImportSource @emotion/react */
import {
  Box,
} from '@mui/material';
import { css } from '@emotion/react';

const actionBarBoxStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '50px',
  width: '100%',
  backgroundColor: '#1976d2',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  fontSize: '20px',
  color: 'white',
});

function View() {
  return (
    <Box css={actionBarBoxStyle}>
      Cessna Skyhawk 🛩️
    </Box>
  );
}

function Model() {
  const hookProps = {

  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
export { View };
