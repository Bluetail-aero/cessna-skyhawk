/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiRoutes, getRouteTextByPathname } from 'navbar/const/apiRoutes';
import { ListItemText, MenuItem, MenuList } from '@mui/material';
import { useCallback } from 'react';

const styles = {
  menuItem: css({
    '&.Mui-selected': {
      backgroundColor: 'rgba(25, 118, 210, 0.5)',
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.5)',
    },
  }),
};

function View({ doNavigate, currentRoute }) {
  return (
    <MenuList>
      {apiRoutes.map(({ text, route }) => (
        <MenuItem
          key={route}
          css={styles.menuItem}
          onClick={() => doNavigate(route)}
          selected={currentRoute === text}
        >
          <ListItemText>{text}</ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
}

function Model() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentRoute = getRouteTextByPathname(location.pathname);

  const doNavigate = useCallback((route) => {
    navigate(route);
  }, [navigate]);

  const hookProps = {
    doNavigate,
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
