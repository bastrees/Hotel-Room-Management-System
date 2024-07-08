import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/customer/Dashboard'; // Updated path
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import UserManagement from './pages/admin/UserManagement'; // Ensure this import is correct
import Reports from './pages/admin/Reports';
import RoomManagement from './pages/admin/RoomManagement';
import BookingSystem from './pages/admin/BookingSystem';
import Notifications from './pages/admin/Notifications';
import ProtectedRoute from './ProtectedRoute';
import Layout from './components/Layout';
import { roles } from './roles';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout><Home /></Layout>,
    },
    {
        path: '/login',
        element: <Layout><Login /></Layout>,
    },
    {
        path: '/signup',
        element: <Layout><SignUp /></Layout>,
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute allowedRoles={[roles.CUSTOMER, roles.MANAGER, roles.ADMIN]}>
                <Layout><Dashboard /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute allowedRoles={[roles.ADMIN]}>
                <Layout><AdminDashboard /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/user-management',
        element: (
            <ProtectedRoute allowedRoles={[roles.ADMIN]}>
                <Layout><UserManagement /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/reports',
        element: (
            <ProtectedRoute allowedRoles={[roles.ADMIN]}>
                <Layout><Reports /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/room-management',
        element: (
            <ProtectedRoute allowedRoles={[roles.ADMIN]}>
                <Layout><RoomManagement /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/booking-system',
        element: (
            <ProtectedRoute allowedRoles={[roles.ADMIN]}>
                <Layout><BookingSystem /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/notifications',
        element: (
            <ProtectedRoute allowedRoles={[roles.ADMIN]}>
                <Layout><Notifications /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/manager',
        element: (
            <ProtectedRoute allowedRoles={[roles.MANAGER]}>
                <Layout><ManagerDashboard /></Layout>
            </ProtectedRoute>
        ),
    },
]);

export default Routes;
