import { useTheme } from '@emotion/react'
import './App.css'
import MembersByCategory from './Components/Dashboard/MembersByCategory'
import MembersByGender from './Components/Dashboard/MembersByGender'

function App() { 

  return (
    <>
    Hi!
    <div>Hello!</div>
      
      <MembersByCategory/>
      <MembersByGender/>
    </>
  )
}

export default App
