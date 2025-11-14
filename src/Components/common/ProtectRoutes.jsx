import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectRoutes = () => {
    const location = useLocation();
    const token = sessionStorage.getItem("token")
    return (
        token !== undefined && token !== null ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
    )
}

export default ProtectRoutes