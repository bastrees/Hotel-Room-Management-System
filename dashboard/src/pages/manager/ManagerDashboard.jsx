import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerDashboard.css'; // Create and import the CSS file for manager dashboard

const ManagerDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="manager-dashboard">
            <h1>Manager Dashboard</h1>
            <div className="card-container">
                <div className="card" onClick={() => navigate('/manager/room-management')}>
                    <h2>Room Management</h2>
                    <p>Manage room listings and availability.</p>
                    <button>Manage Rooms</button>
                </div>
                <div className="card" onClick={() => navigate('/manager/booking-management')}>
                    <h2>Booking Management</h2>
                    <p>View and manage bookings.</p>
                    <button>Manage Bookings</button>
                </div>
                <div className="card" onClick={() => navigate('/manager/reports')}>
                    <h2>Reports</h2>
                    <p>View system usage reports and booking trends.</p>
                    <button>View Reports</button>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
