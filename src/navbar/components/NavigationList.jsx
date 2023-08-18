/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiRoutes, getRouteTextByPathname } from 'navbar/const/apiRoutes';
import { ListItemText, MenuItem, MenuList } from '@mui/material';
import { useCallback } from 'react';
import { useAuthStore } from 'login/hooks/useAuthStore';

const styles = {
  navbar: css({
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  }),
  menuItem: css({
    '&.Mui-selected': {
      backgroundColor: 'rgba(25, 118, 210, 0.5)',
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.5)',
    },
  }),
  other: css({
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
  }),
  separator: css({

  }),
};

function View({ doNavigate, currentRoute, doLogout }) {
  return (
    <MenuList css={styles.navbar}>
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
      <div css={styles.other}>
        <div css={styles.separator} />
        <MenuItem
          key="logout"
          css={styles.menuItem}
          onClick={doLogout}
          selected={false}
        >
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </div>
    </MenuList>
  );
}

function Model() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

  const currentRoute = getRouteTextByPathname(location.pathname);

  const doNavigate = useCallback((route) => {
    navigate(route);
  }, [navigate]);

  const doLogout = useCallback(() => {
    logout();
  }, [logout]);

  const hookProps = {
    doNavigate,
    currentRoute,
    doLogout,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
export { View };
