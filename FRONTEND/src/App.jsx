import { CssBaseline } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './components/layout/AppLayout'
import GeneralInformation from './Components/Recruitement/Questions/GeneralInformation'
import { RoutesProvider } from './router/context/RoutesContext'

function App() { 

  return (
    <RoutesProvider>
    <CssBaseline></CssBaseline>
    <Routes>
      <Route element={<AppLayout></AppLayout>} path='/'>
        <Route path='dashboard'>

        </Route>
        <Route path='recruitement'>
            <Route path='interviews' element={<GeneralInformation></GeneralInformation>}></Route>
            <Route path='schedule'></Route>
            <Route path='settings'></Route>
        </Route>
        <Route path='team-members'>

        </Route>
        <Route path='meetings'>
          <Route path='meetings'></Route>
          <Route path='settings'></Route>
        </Route>
        <Route path='evaluation'>

        </Route>

      </Route>
    </Routes>
    </RoutesProvider>
  )
 
}

export default App