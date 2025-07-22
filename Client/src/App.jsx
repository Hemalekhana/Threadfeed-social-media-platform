import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Components/Login'
import Signup from "./Components/Signup"
import Dashboard from  './Components/Dashboard'
import VerifyEmail from "./Components/VerifyEmail"
import Users from './Components/Users'
import Chats from "./Components/Chats"
import CreatePost from "./Components/CreatePost"
import SettingsPage from "./Components/SettingsPage"
  

function App(){
  return(
    <div className="div">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App