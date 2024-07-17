import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="card-container">
                <div className="card" onClick={() => navigate('/admin/user-management')}>
                    <h2>User Management</h2>
                    <p>Manage users, approve new sign-ups, and edit user details.</p>
                    <button>Go to User Management</button>
                </div>
                <div className="card" onClick={() => navigate('/admin/reports')}>
                    <h2>Reports</h2>
                    <p>View system usage reports and booking trends.</p>
                    <button>View Reports</button>
                </div>
                <div className="card" onClick={() => navigate('/admin/room-management')}>
                    <h2>Room Management</h2>
                    <p>Manage room listings and availability.</p>
                    <button>Manage Rooms</button>
                </div>
                <div className="card" onClick={() => navigate('/admin/booking-management')}>
                    <h2>Booking Management</h2>
                    <p>View and manage bookings.</p>
                    <button>View Bookings</button>
                </div>
                <div className="card" onClick={() => navigate('/admin/notifications')}>
                    <h2>Notifications</h2>
                    <p>Manage notification settings and templates.</p>
                    <button>Manage Notifications</button>
                </div>
                <div className="card" onClick={() => navigate('/admin/audit-logs')}>
                    <h2>Audit Logs</h2>
                    <p>View audit logs for user actions.</p>
                    <button>View Audit Logs</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
