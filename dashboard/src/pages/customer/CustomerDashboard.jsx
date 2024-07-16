import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="customer-dashboard">
            <h1>Customer Dashboard</h1>
            <div className="card-container">
                <div className="card" onClick={() => navigate('/customer/room-search')}>
                    <h2>Search Rooms</h2>
                    <p>Find and view available rooms.</p>
                    <button>Search Rooms</button>
                </div>
                {/* <div className="card" onClick={() => navigate('/customer/book-room')}>
                    <h2>Book a Room</h2>
                    <p>Make a reservation for a room.</p>
                    <button>Book a Room</button>
                </div> */}
                <div className="card" onClick={() => navigate('/customer/booking-history')}>
                    <h2>Booking History</h2>
                    <p>View your past bookings and manage reservations.</p>
                    <button>View History</button>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
