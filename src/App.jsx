import React from 'react'
import { useAuth } from "./context/AuthContext.jsx"
import ReactRouter from './router/ReactRouter.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import ProtectRoute from './middleware/ProtectRoute.jsx'

export default function App() {
  const { user } = useAuth();

  return user ? (
    <ProtectRoute>
      <div className="flex flex-col-reverse lg:flex-row">
        <Navbar/>
        <ReactRouter/>
      </div>
      </ProtectRoute>
  ) : (
    <Login/>
  )
}