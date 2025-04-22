import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from "./components/Profile"
import UserDashboard from "./components/UserDashboard"
import AdminDashboard from "./components/AdminDashboard"

function App() {

  return (
    <Router>
        <div className="app">
            <Navbar />
            
            <div className="content">
                <Routes>
                    {/* /Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected routes for all authenticated users */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/dashboard" element={<UserDashboard />} />
                    </Route>

                    {/* Protected routes for admin only */}
                    <Route element={<ProtectedRoute requiredRole="Admin" />}>
                      <Route path="/admin" element={<AdminDashboard />} />
                    </Route>
                </Routes>
            </div>
        </div>
    </Router>
  )
}

export default App