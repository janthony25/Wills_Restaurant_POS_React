import React from 'react'
import { isAuthenticated } from '../services/authService'

const Home = () => {
    const authenticated = isAuthenticated();


  return (
    <div>
    <h1>Welcome to Auth Demo</h1>
    <p>This is a simple demo of a full stack authentication system using .NET Core 8 and React.</p>
    
    {authenticated ? (
      <div>
        <p>You are logged in!</p>
        <p>
          <Link to="/profile">View your profile</Link>
        </p>
      </div>
    ) : (
      <div>
        <p>Please log in or register to continue.</p>
        <p>
          <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
        </p>
      </div>
    )}
  </div>
  )
}

export default Home
