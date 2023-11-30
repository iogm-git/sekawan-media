import { Routes, Route } from "react-router-dom"

// asssets
import 'src/assets/root.css'

// auth page
import Login from './views/pages/auth/Login'

// admin page
import Admin from './views/pages/admin/Admin'
import Input from './views/pages/admin/Input'

// approver page
import Approver from './views/pages/approver/Approver'
import Protected from "./utils/Protected"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Protected qualify={true} type={'route'}><Login /></Protected>}></Route>
        <Route path="admin" element={<Protected type={'route'}><Admin /></Protected>}></Route>
        <Route path="input" element={<Protected type={'route'}><Input /></Protected>}></Route>
        <Route path="approver" element={<Protected type={'route'}><Approver /></Protected>}></Route>
      </Routes>
    </>
  )
}

export default App
