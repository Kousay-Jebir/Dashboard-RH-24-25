import { CssBaseline } from '@mui/material'
import './App.css'

import AppLayout from './components/layout/global-layout/AppLayout';
import { Route, Routes } from 'react-router-dom'
import { RoutesProvider } from './router/context/RoutesContext'

import MainContentLayout from './components/layout/main-content-layout/MainContentLayout';
import Dashoboard from './Pages/Dashboard/Dashoboard'
import Interviews from './Pages/Recrutement/Interviews'
import RecentMeetings from './Pages/Meetings/RecentMeetings';
import DepartmentDataGrid from './Components/Meetings/Schedule/Department/DepartmentDataGrid';
import GeneralAssembly from './Pages/Meetings/GeneralAssembly';
import TeamBuilding from './Pages/Meetings/TeamBuilding';
import EventDataGrid from './Components/Meetings/Schedule/Event/EventDataGrid';
import KanbanBoard from './Pages/Recrutement/schedule/KanbanBoard';
import InterviewsList from './Pages/Recrutement/schedule/InterviewsList';
import Login from './Pages/Login/Login';

function App() { 
  return (
    <RoutesProvider>
      <CssBaseline />
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={<AppLayout />}>
          <Route path="dashboard" element={<Dashoboard />} />

          <Route element={<MainContentLayout />}>
            <Route path="recruitement" >
              <Route path="interviews">
                <Route path="recent"  element={<Interviews/>}/>
                <Route path="questions" />
              </Route>
              <Route path="schedule">
                <Route path="list" element={<InterviewsList/>}/>
                <Route path="board" element={<KanbanBoard/>} />
              </Route>
              <Route path="settings" />
            </Route>

            <Route path="team-members" />

            <Route path="meetings">
              <Route path="meetings">
                <Route path="recent" element={<RecentMeetings/>} />
                <Route path="schedule">
                  <Route path="department" element={<DepartmentDataGrid/>}/>
                  <Route path="general-assembly" element={<GeneralAssembly />} />
                  <Route path="team-building" element={<TeamBuilding />} />
                  <Route path="event" element={<EventDataGrid />}/>
                </Route>
              </Route>
              <Route path="settings" />
            </Route>
            <Route path="evaluation" />
          </Route>
        </Route>
      </Routes>
    </RoutesProvider>
  );
}

export default App
