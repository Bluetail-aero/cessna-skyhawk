import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import ListAircraftFolders from 'pages/ListAircraftFolders';
import ListOfficeFolders from 'pages/ListOfficeFolders';
import FinalizeUpload from 'pages/FinalizeUpload';
import RequestUpload from 'pages/RequestUpload';

import { useAuthStore } from 'login/hooks/useAuthStore';
import 'react-toastify/dist/ReactToastify.css';

function View() {
  return (
    <Routes>
      <Route
        path="/listAircraftFolders"
        element={<ListAircraftFolders />}
      />
      <Route
        path="/listOfficeFolders"
        element={<ListOfficeFolders />}
      />
      <Route
        path="/requestUpload"
        element={<FinalizeUpload />}
      />
      <Route
        path="/finalizeUpload"
        element={<RequestUpload />}
      />
      <Route
        path="*"
        element={<Navigate to="/listAircraftFolders" />}
      />
    </Routes>
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
