import {
  Routes,
  Route,
} from 'react-router-dom';

import OAuthCallbackHandler from 'login/components/OAuthCallbackHandler';
import Login from 'login/components/Login';

import 'react-toastify/dist/ReactToastify.css';

function View() {
  return (
    <Routes>
      <Route
        path="/oauth_callback"
        element={<OAuthCallbackHandler />}
      />
      <Route
        path="*"
        element={<Login />}
      />
    </Routes>
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
