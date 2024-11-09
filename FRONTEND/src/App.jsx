import { CssBaseline } from "@mui/material";
import { jwtDecode } from 'jwt-decode';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from "./context/AuthContext";
import { RoutesProvider } from './router/context/RoutesContext';

import "./App.css";
import AppLayout from './components/layout/global-layout/AppLayout';
import MainContentLayout from './components/layout/main-content-layout/MainContentLayout';

import MeetingDetails from "./Components/Meetings/MeetingDetails/MeetingDetails";
import AddMemberPopup from "./Components/Recrutement/Interviews/AddMemberPopup";
import GlobalForm from "./Components/Recrutement/Interviews/Questions/Global";
import Dashoboard from './Pages/Dashboard/Dashoboard';
import LoginV2 from "./Pages/Login/LoginV2";
import DepartmentMeetings from './Pages/Meetings/DepartmentMeetings';
import Event from './Pages/Meetings/Event';
import GeneralAssembly from './Pages/Meetings/GeneralAssembly';
import RecentMeetings from './Pages/Meetings/RecentMeetings';
import TeamBuilding from './Pages/Meetings/TeamBuilding';
import Interviews from './Pages/Recrutement/Interviews';
import InterviewsList from './Pages/Recrutement/schedule/InterviewsList';
import KanbanBoard from './Pages/Recrutement/schedule/KanbanBoard';
import TeamMembers from './Pages/Team members/TeamMembers';
import { NotificationProvider } from "./context/SnackBarContext";

// Higher-order component to protect routes
const isTokenValid = (token) => {
  if (!token) return false;

  try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decodedToken.exp > currentTime;
  } catch (error) {
      console.error("Token decoding error:", error);
      return false; // Invalid token
  }
};

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, authData} = useAuth();
  const accessToken = authData.accessToken;
  const isValid = isTokenValid(accessToken);
  return isAuthenticated && isValid ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <RoutesProvider>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<MeetingDetails></MeetingDetails>}></Route>
          <Route path="/login" element={<LoginV2 />} />
          <Route path="/" element={<AppLayout />}>
          <Route path="dashboard" element={<ProtectedRoute element={<Dashoboard />} />} />
          <Route path="/test" element={<AddMemberPopup />}></Route>
            <Route element={<MainContentLayout />}>
              <Route path="recruitement">
                <Route path="interviews">
                <Route path="recent" element={<ProtectedRoute element={<Interviews />} />} />
                {/* <Route path="questions" element={<ProtectedRoute element={<GlobalForm />} />} /> */}
                <Route path=":id" element={<ProtectedRoute element={<GlobalForm />} />} />
                </Route>
                <Route path="schedule">
                <Route path="list" element={<ProtectedRoute element={<InterviewsList />} />} />
                <Route path="board" element={<ProtectedRoute element={<KanbanBoard />} />} />
                </Route>
                <Route path="settings" />
              </Route>
              <Route path="team-members">
              <Route path="all" element={<ProtectedRoute element={<TeamMembers department="all" />} />} />
              <Route path="dev-co" element={<ProtectedRoute element={<TeamMembers department="Dév. Commercial" />} />} />
                  <Route path="marketing" element={<ProtectedRoute element={<TeamMembers department="Marketing" />} />} />
                  <Route path="projet" element={<ProtectedRoute element={<TeamMembers department="Projet" />} />} />
                  <Route path="cellule-qualite" element={<ProtectedRoute element={<TeamMembers department="Cellule Qualité" />} />} />
              </Route>
              <Route path="meetings">
                <Route path="meetings">
                <Route path="recent" element={<ProtectedRoute element={<RecentMeetings />} />} />
                  <Route path="schedule">
                  <Route path="department" element={<ProtectedRoute element={<DepartmentMeetings />} />} />
                    <Route path="general-assembly" element={<ProtectedRoute element={<GeneralAssembly />} />} />
                    <Route path="team-building" element={<ProtectedRoute element={<TeamBuilding />} />} />
                    <Route path="event" element={<ProtectedRoute element={<Event />} />} />
                  </Route>
                </Route>
                <Route path="settings" />
              </Route>
              <Route path="evaluation" />
            </Route>
          </Route>
        </Routes>
        </RoutesProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;

