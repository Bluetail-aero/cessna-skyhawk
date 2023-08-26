/** @jsxImportSource @emotion/react */
import {
  Box, Chip
} from '@mui/material';
import { css } from '@emotion/react';
import { useAuthStore } from 'login/hooks/useAuthStore';

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

const chipStyle = css({
  marginLeft: 'auto',
});

function View({ accessToken }) {
  return (
    <Box css={actionBarBoxStyle}>
      Cessna Skyhawk 🛩️
      <Chip label={`Access Token: ${accessToken}`} css={chipStyle} />
    </Box>
  );
}

function Model() {
  const { accessToken } = useAuthStore();

  const hookProps = {
    accessToken,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
export { View };
