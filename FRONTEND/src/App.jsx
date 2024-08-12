import PersonIcon from '@mui/icons-material/Person'; // Import the Person icon
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './components/layout/AppLayout';
import TicketKPI from './components/TicketKPI';

function App() {
 

  return (
    <>
    <CssBaseline></CssBaseline>
    <Routes>
      
      <Route element={<AppLayout></AppLayout>}>
        <Route path='test1' element={<div>Dashboard</div>}></Route>
        <Route path='test2' element={<div>test2</div>}></Route>
        <Route
            path='kpi'
            element={
              <div>
                <TicketKPI
                  title="Example"
                  value="123"
                  
                  icon={<PersonIcon/>} 
                />
              </div>
            }
          />
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
