import { CssBaseline } from "@mui/material";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/global-layout/AppLayout';
import MainContentLayout from './components/layout/main-content-layout/MainContentLayout';
import Dashoboard from './Pages/Dashboard/Dashoboard';
import Login from './Pages/Login/Login';
import DepartmentMeetings from './Pages/Meetings/DepartmentMeetings';
import Event from './Pages/Meetings/Event';
import GeneralAssembly from './Pages/Meetings/GeneralAssembly';
import RecentMeetings from './Pages/Meetings/RecentMeetings';
import TeamBuilding from './Pages/Meetings/TeamBuilding';
import Interviews from './Pages/Recrutement/Interviews';
import InterviewsList from './Pages/Recrutement/schedule/InterviewsList';
import KanbanBoard from './Pages/Recrutement/schedule/KanbanBoard';
import TeamMembers from './Pages/Team members/TeamMembers';
import { RoutesProvider } from './router/context/RoutesContext';
import AllQuestions from './Components/Recrutement/Interviews/Questions/AllQuestions';

// Higher-order component to protect routes
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <RoutesProvider>
        <CssBaseline />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AppLayout />}>
            <Route path="dashboard" element={<ProtectedRoute element={<Dashoboard />} />} />
            <Route element={<MainContentLayout />}>
              <Route path="recruitement" element={<ProtectedRoute element={<Interviews />} />}>
                <Route path="interviews/recent" element={<ProtectedRoute element={<Interviews />} />} />
                <Route path="interviews/questions" element={<ProtectedRoute element={<AllQuestions />} />} />
                <Route path="schedule">
                  <Route path="list" element={<ProtectedRoute element={<InterviewsList />} />} />
                  <Route path="board" element={<ProtectedRoute element={<KanbanBoard />} />} />
                </Route>
              </Route>
              <Route path="team-members" element={<ProtectedRoute element={<TeamMembers department="all" />} />}>
                <Route path="all" element={<ProtectedRoute element={<TeamMembers department="all" />} />} />
                <Route path="dev-co" element={<ProtectedRoute element={<TeamMembers department="Dév. Commercial" />} />} />
                <Route path="marketing" element={<ProtectedRoute element={<TeamMembers department="Marketing" />} />} />
                <Route path="projet" element={<ProtectedRoute element={<TeamMembers department="Projet" />} />} />
                <Route path="cellule-qualite" element={<ProtectedRoute element={<TeamMembers department="Cellule Qualité" />} />} />
              </Route>
              <Route path="meetings" element={<ProtectedRoute element={<RecentMeetings />} />}>
                <Route path="recent" element={<ProtectedRoute element={<RecentMeetings />} />} />
                <Route path="schedule">
                  <Route path="department" element={<ProtectedRoute element={<DepartmentMeetings />} />} />
                  <Route path="general-assembly" element={<ProtectedRoute element={<GeneralAssembly />} />} />
                  <Route path="team-building" element={<ProtectedRoute element={<TeamBuilding />} />} />
                  <Route path="event" element={<ProtectedRoute element={<Event />} />} />
                </Route>
              </Route>
              {/* <Route path="evaluation" element={<ProtectedRoute element={<Evaluation />} />} /> */}
            </Route>
          </Route>
        </Routes>
      </RoutesProvider>
    </AuthProvider>
  );
}

export default App;

