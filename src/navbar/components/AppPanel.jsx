/** @jsxImportSource @emotion/react */

function View({ renderAppComponent }) {
  return (
    <>
      { renderAppComponent() }
    </>
  );
}

export default View;
