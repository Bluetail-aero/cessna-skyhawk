import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import StyleRoot from 'common/theme/root';
import history from 'common/const/history';
import TopErrorBoundary from 'common/components/TopErrorBoundary';
import App from 'app/index';
import Login from 'login/index';
import { useAuthStore } from 'login/hooks/useAuthStore';

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
                path="*"
                element={<App />}
              />
            )}
            {!isAuthenticated && (
              <Route
                path="*"
                element={<Login />}
              />
            )}
          </Routes>
        </Router>
      </TopErrorBoundary>
    </>
  );
}

function Model() {
  const { accessToken } = useAuthStore();

  const hookProps = {
    isAuthenticated: accessToken !== null,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
export { View };
