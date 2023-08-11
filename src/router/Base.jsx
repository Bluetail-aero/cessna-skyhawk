import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import StyleRoot from 'common/theme/root';
import history from 'common/const/history';
import TopErrorBoundary from 'common/components/TopErrorBoundary';
import App from 'app/index';
import Login from 'login/index';
import { selectIsAuthenticated, useAuthStore } from 'login/hooks/useAuthStore';

import 'react-toastify/dist/ReactToastify.css';

function View({ isAuthenticated }) {
  return (
    <>
      <StyleRoot />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
      />
      <TopErrorBoundary>
        <Router
          history={history}
        >
          <Routes>
            {isAuthenticated && (
            <Route
              path="/"
              element={<App />}
            />
            )}
            {!isAuthenticated && (
            <Route
              path="/"
              element={<Login />}
            />
            )}
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </Router>
      </TopErrorBoundary>
    </>
  );
}

function Model() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  const hookProps = {
    isAuthenticated,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
export { View };
