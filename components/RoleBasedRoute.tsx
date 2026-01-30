import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RoleBasedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
    redirectTo?: string;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
    children,
    allowedRoles,
    redirectTo = '/unauthorized'
}) => {
    const { user, userData, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen bg-[#050505] text-cyan-500">
                <div className="animate-pulse">Verifying Access Privileges...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // specific check for role availability
    const userRole = userData?.role || 'user'; // Fallback to 'user' if not set

    if (!allowedRoles.includes(userRole)) {
        console.warn(`Access denied for role: ${userRole}. Allowed: ${allowedRoles.join(', ')}`);
        // If user is logged in but has wrong role, redirect to their dashboard or unauthorized page
        // For now, if they are 'user' trying to access admin, we might redirect to home
        return <Navigate to={redirectTo === '/unauthorized' ? '/' : redirectTo} replace />;
    }

    return <>{children}</>;
};
