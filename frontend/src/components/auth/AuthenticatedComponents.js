import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthenticatedComponents = () => {
    const authUser = localStorage.getItem('user');
    return (authUser ? <Outlet /> : <Navigate to="/login" />)
}

export default AuthenticatedComponents