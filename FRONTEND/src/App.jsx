import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/global-layout/AppLayout";
import MainContentLayout from "./components/layout/main-content-layout/MainContentLayout";
import ScheduleInterview from "./Components/Recrutement/ScheduleInterview";
import Dashoboard from "./Pages/Dashboard/Dashoboard";
import Login from "./Pages/Login/Login";
import DepartmentMeetings from "./Pages/Meetings/DepartmentMeetings";
import Event from "./Pages/Meetings/Event";
import GeneralAssembly from "./Pages/Meetings/GeneralAssembly";
import RecentMeetings from "./Pages/Meetings/RecentMeetings";
import TeamBuilding from "./Pages/Meetings/TeamBuilding";
import Interviews from "./Pages/Recrutement/Interviews";
import InterviewsList from "./Pages/Recrutement/schedule/InterviewsList";
import KanbanBoard from "./Pages/Recrutement/schedule/KanbanBoard";
import TeamMembers from "./Pages/Team members/TeamMembers";
import AllQuestions from "./Components/Recrutement/Interviews/Questions/AllQuestions";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider
import ProtectedRoute from "./Components/ProtectedRoute"; // Import the ProtectedRoute

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={<ProtectedRoute element={<AppLayout />} />}
        >
          <Route path="dashboard" element={<ProtectedRoute element={<Dashoboard />} />} />
          
          <Route element={<MainContentLayout />}>
            {/* Recruitement Routes */}
            <Route path="recruitement">
              <Route path="interviews">
                <Route path="recent" element={<ProtectedRoute element={<Interviews />} />} />
                <Route path="questions" element={<ProtectedRoute element={<AllQuestions />} />} />
              </Route>
              <Route path="schedule">
                <Route path="list" element={<ProtectedRoute element={<InterviewsList />} />} />
                <Route path="board" element={<ProtectedRoute element={<KanbanBoard />} />} />
              </Route>
            </Route>

            {/* Team Members Routes */}
            <Route path="team-members">
              <Route path="all" element={<ProtectedRoute element={<TeamMembers department="all" />} />} />
              <Route path="dev-co" element={<ProtectedRoute element={<TeamMembers department="Dév. Commercial" />} />} />
              <Route path="marketing" element={<ProtectedRoute element={<TeamMembers department="Marketing" />} />} />
              <Route path="projet" element={<ProtectedRoute element={<TeamMembers department="Projet" />} />} />
              <Route path="cellule-qualite" element={<ProtectedRoute element={<TeamMembers department="Cellule Qualité" />} />} />
            </Route>

            {/* Meetings Routes */}
            <Route path="meetings">
              <Route path="recent" element={<ProtectedRoute element={<RecentMeetings />} />} />
              <Route path="schedule">
                <Route path="department" element={<ProtectedRoute element={<DepartmentMeetings />} />} />
                <Route path="general-assembly" element={<ProtectedRoute element={<GeneralAssembly />} />} />
                <Route path="team-building" element={<ProtectedRoute element={<TeamBuilding />} />} />
                <Route path="event" element={<ProtectedRoute element={<Event />} />} />
              </Route>
            </Route>

            {/* Other Protected Routes */}
            <Route path="evaluation" element={<ProtectedRoute element={<MainContentLayout />} />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
