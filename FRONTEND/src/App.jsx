import { CssBaseline, useTheme } from '@mui/material'
import './App.css'
import AppLayout from './components/layout/global-layout/AppLayout'
import { Route, Routes } from 'react-router-dom'
import { RoutesProvider } from './router/context/RoutesContext'

import Dashoboard from './Pages/Dashboard/Dashoboard'
import MainContentLayout from './components/layout/main-content-layout/MainContentLayout'
function App() { 

  return (
    <RoutesProvider>
    <CssBaseline></CssBaseline>
    <Routes>
      <Route element={<AppLayout></AppLayout>} path='/'>

        <Route path='dashboard' element={<Dashoboard/>}>

        </Route>
        <Route element={<MainContentLayout/>}>
          <Route path='recruitement'>
              <Route path='interviews'></Route>
              <Route path='schedule'></Route>
              <Route path='settings'></Route>
          </Route>
          <Route path='team-members'>
          </Route>
          <Route path='meetings'>
            <Route path='meetings'>
            <Route path='recent'/>
            <Route path='schedule'>
              <Route path='department'/>
              <Route path='general-assembly'/>
              <Route path='team-building'/>
              <Route path='event'/>
            </Route>
            </Route>
            <Route path='settings'></Route>
          </Route>
          <Route path='evaluation'>
          </Route>
        </Route>

      </Route>
    </Routes>
    </RoutesProvider>
  )
 
}

export default App
