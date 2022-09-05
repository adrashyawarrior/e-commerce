import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const RequireAuth = () => {
    const isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);
    const authUser = useSelector((state) => state.authStore.authUser);

    return (isAuthenticated && authUser.type === 'User' ? <Outlet /> : <Navigate to="/login" />)
}

export default RequireAuth