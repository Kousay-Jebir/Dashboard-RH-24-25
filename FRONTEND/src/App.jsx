import { CssBaseline } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './components/layout/AppLayout'

function App() {
 

  return (
    <>
    <CssBaseline></CssBaseline>
    <Routes>
      
      <Route element={<AppLayout></AppLayout>}>
        <Route path='test1' element={<div>Dashboard</div>}></Route>
        <Route path='test2' element={<div>test2</div>}></Route>

        <Route path='dashboard'>
        </Route>
        <Route path='recruitement'>
            <Route path='interviews'></Route>
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
    </>
  )
}

export default App
