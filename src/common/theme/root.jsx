import { css, Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

const style = css({});

function StyleRoot() {
  return (
    <>
      <Global
        styles={style}
      />
      <CssBaseline />
    </>
  );
}

export default StyleRoot;
