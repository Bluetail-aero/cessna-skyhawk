/** @jsxImportSource @emotion/react */

import { Link } from 'react-router-dom';
import { apiRoutes } from 'navbar/const/apiRoutes';

function View() {
  return (
    <ul>
      {apiRoutes.map(({ text, route }) => (
        <li key={route}>
          <Link to={route}>{text}</Link>
        </li>
      ))}
    </ul>
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
