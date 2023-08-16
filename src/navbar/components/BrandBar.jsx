/** @jsxImportSource @emotion/react */
import {
  Box,
} from '@mui/material';
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import { getRouteTextByPathname } from 'navbar/const/apiRoutes';

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

function View({ currentRoute }) {
  return (
    <Box css={actionBarBoxStyle}>
      Cessna Skyhawk 🛩️
      {' '}
      {currentRoute && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {`- ${currentRoute}`}
        </>
      )}
    </Box>
  );
}

function Model() {
  const location = useLocation();

  const currentRoute = getRouteTextByPathname(location.pathname);

  const hookProps = {
    currentRoute,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
export { View };
