import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import GetMe from 'pages/GetMe';
import GetMyAccounts from 'pages/GetMyAccounts';
import SwitchAccount from 'pages/SwitchAccount';
import ListAircraft from 'pages/ListAircraft';
import ListAircraftFolders from 'pages/ListAircraftFolders';
import ListOfficeFolders from 'pages/ListOfficeFolders';
import FinalizeUpload from 'pages/FinalizeUpload';
import RequestUpload from 'pages/RequestUpload';
import CreateAircraftFolder from 'pages/CreateAircraftFolder';

import { useAuthStore } from 'login/hooks/useAuthStore';
import 'react-toastify/dist/ReactToastify.css';

function View() {
  return (
    <Routes>
      <Route
        path="/getMe"
        element={<GetMe />}
      />
      <Route
        path="/getMyAccounts"
        element={<GetMyAccounts />}
      />
      <Route
        path="/switchAccount"
        element={<SwitchAccount />}
      />
      <Route
        path="/createAircraftFolder"
        element={<CreateAircraftFolder />}
      />
      <Route
        path="/listAircraft"
        element={<ListAircraft />}
      />
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
        element={<RequestUpload />}
      />
      <Route
        path="/finalizeUpload"
        element={<FinalizeUpload />}
      />
      <Route
        path="*"
        element={<Navigate to="/getMe" />}
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
