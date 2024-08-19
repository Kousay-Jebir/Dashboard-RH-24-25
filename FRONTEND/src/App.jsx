import { CssBaseline, useTheme } from '@mui/material'
import './App.css'
import AppLayout from './components/layout/global-layout/AppLayout';
import { Route, Routes } from 'react-router-dom'
import { RoutesProvider } from './router/context/RoutesContext'

import Dashoboard from './Pages/Dashboard/Dashoboard'
import Interviews from './Pages/Recrutement/Interviews'
import MainContentLayout from './components/layout/main-content-layout/MainContentLayout';
import KanbanBoard from './Components/Recrutement/Schedule/KanbanBoard'

function App() { 
  return (
    <RoutesProvider>
    <CssBaseline></CssBaseline>
    <Routes>
      <Route element={<AppLayout></AppLayout>} path='/'>

        <Route path='dashboard'  element={<Dashoboard/>}>

        </Route>
        <Route path='recruitement'>
            <Route path='interviews'  element={<Interviews/>}></Route>
            <Route path='schedule' element={<KanbanBoard/>}></Route>
            <Route path='settings'></Route>
        </Route>
        <Route path='team-members'>

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

export default App;
