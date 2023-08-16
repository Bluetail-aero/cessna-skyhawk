/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';

function View() {
  return (
    <div>
      JSON Goes Here
    </div>
  );
}

function Model() {
  const hookProps = {};

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
export { View };
