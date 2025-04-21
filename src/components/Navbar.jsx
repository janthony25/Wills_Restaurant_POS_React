import React from 'react'
import { useNavigate } from 'react-router-dom'
import { hasRole, isAuthenticated, logout } from '../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();
    const isAdmin = hasRole('Admin');

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

  return (
    <nav>
    <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
      <li><Link to="/">Home</Link></li>
      
      {authenticated ? (
        <>
          <li><Link to="/profile">Profile</Link></li>
          {isAdmin && <li><Link to="/admin">Admin Dashboard</Link></li>}
          <li><Link to="/dashboard">User Dashboard</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </>
      ) : (
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
      )}
    </ul>
  </nav>
  )
}

export default Navbar
