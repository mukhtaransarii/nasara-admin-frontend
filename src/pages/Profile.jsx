import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Profile() {
  const { logout, user } = useAuth()
  
  function handleLogout() {
    const res = confirm('are you sure to logout?')
    if(res) logout()
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      
      <div>
        <p className="text-sm bg-gray-100 p-2 rounded font-medium mb-2">
              Name: <span className="font-semibold">{user.name}</span>
        </p>
        <p className="text-sm bg-gray-100 p-2 rounded font-medium mb-2">
              Username: <span className="font-semibold">{user.username}</span>
        </p>
        <p className="text-sm bg-gray-100 p-2 rounded font-medium mb-2">
              Email: <span className="font-semibold">{user.email}</span>
        </p>
      </div>
      <button onClick={handleLogout} className="p-2 bg-red-500 rounded">
        Logout
      </button>    
    </div>
  )
}