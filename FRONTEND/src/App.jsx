import { CssBaseline } from '@mui/material'
import './App.css'
import AppLayout from './components/layout/AppLayout'
import { Route, Routes } from 'react-router-dom'

function App() {
 

  return (
    <>
    <CssBaseline></CssBaseline>
    <Routes>
      <Route element={<AppLayout></AppLayout>}>
        <Route path='test1' element={<div>test1</div>}></Route>
        <Route path='test2' element={<div>test2</div>}></Route>

      </Route>
    </Routes>
    </>
  )
}

export default App
