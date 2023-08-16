/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import BrandBar from 'navbar/components/BrandBar';
import NavigationList from 'navbar/components/NavigationList';
import AppPanel from 'navbar/components/AppPanel';
import AppRouter from 'router/App';

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
  width: '100%',
});

const actionBarStyle = css({
  height: '50px',
  backgroundColor: 'rgba(6,117,224, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
});

const contentStyle = css({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
});

const leftPanelStyle = css({
  width: '15%',
  maxWidth: '15%',
  maxHeight: '100%',
  overflowY: 'auto',
  padding: '1rem',
});

const rightPanelStyle = css({
  width: '85%',
  maxWidth: '85%',
  maxHeight: '100%',
  overflowX: 'hidden',
  boxShadow: 'inset 1px 1px 5px #555',
  padding: '1rem',
});

const renderAppComponent = () => (
  <AppRouter />
);

function View() {
  return (
    <div css={containerStyle}>
      <div css={actionBarStyle}>
        <BrandBar />
      </div>
      <div css={contentStyle}>
        <div css={leftPanelStyle}>
          <NavigationList />
        </div>
        <div css={rightPanelStyle}>
          <AppPanel
            renderAppComponent={renderAppComponent}
          />
        </div>
      </div>
    </div>
  );
}

function Model(props) {
  const hookProps = {

  };

  return (
    <View
      {...props}
      {...hookProps}
    />
  );
}

export default Model;
export { View };
