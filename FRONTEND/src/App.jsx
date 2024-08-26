import { CssBaseline } from '@mui/material'
import './App.css'

import AppLayout from './components/layout/global-layout/AppLayout';
import { Route, Routes } from 'react-router-dom'
import { RoutesProvider } from './router/context/RoutesContext'

import MainContentLayout from './components/layout/main-content-layout/MainContentLayout';
import Dashoboard from './Pages/Dashboard/Dashoboard'
import Interviews from './Pages/Recrutement/Interviews'
import Layout from './Components/Recrutement/Schedule/KanbanBoard/Layout';
import StatusBar from './Components/Recrutement/Schedule/list/StatusBar';
import KanbanBoard from './Pages/Recrutement/schedule/KanbanBoard';
import InterviewsList from './Pages/Recrutement/schedule/InterviewsList';

function App() { 
  return (
    <RoutesProvider>
      <CssBaseline />
      <Routes>
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
                <Route path="recent" />
                <Route path="schedule">
                  <Route path="department" />
                  <Route path="general-assembly" />
                  <Route path="team-building" />
                  <Route path="event" />
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
