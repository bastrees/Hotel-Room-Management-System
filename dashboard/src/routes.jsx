import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import UserManagement from './pages/admin/UserManagement';
import Reports from './pages/admin/Reports';
import RoomManagementPage from './pages/admin/RoomManagementPage';
import ManagerRoomManagementPage from './pages/manager/RoomManagementPage';
import RoomSearch from './components/Customer/RoomSearch';
import BookingHistory from './components/Customer/BookingHistory';
import AdminBookingManagement from './pages/admin/BookingManagement';
import ManagerBookingManagement from './pages/manager/BookingManagement';
import ProtectedRoute from './ProtectedRoute';
import Layout from './components/Layout';
import PaymentForm from './components/Customer/PaymentForm';
import { roles } from './roles';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout><Home /></Layout>,
    },
    {
        path: '/about',
        element: <Layout><About /></Layout>,
    },
    {
        path: '/contact',
        element: <Layout><Contact /></Layout>,
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
        path: '/customer',
        element: (
            <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                <Layout><CustomerDashboard /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/customer/room-search',
        element: (
            <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                <Layout><RoomSearch /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/customer/booking-history',
        element: (
            <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                <Layout><BookingHistory /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/payment',
        element: (
            <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                <Layout><PaymentForm /></Layout>
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
                <Layout><RoomManagementPage /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/booking-management',
        element: (
            <ProtectedRoute allowedRoles={[roles.ADMIN]}>
                <Layout><AdminBookingManagement /></Layout>
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
    {
        path: '/manager/room-management',
        element: (
            <ProtectedRoute allowedRoles={[roles.MANAGER]}>
                <Layout><ManagerRoomManagementPage /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/manager/booking-management',
        element: (
            <ProtectedRoute allowedRoles={[roles.MANAGER]}>
                <Layout><ManagerBookingManagement /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/manager/reports',
        element: (
            <ProtectedRoute allowedRoles={[roles.MANAGER]}>
                <Layout><Reports /></Layout>
            </ProtectedRoute>
        ),
    },
]);

export default Routes;
