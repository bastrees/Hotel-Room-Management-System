import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingHistory.css';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { VITE_HOST } = import.meta.env;

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        setError(null);
        try {
            const customerId = localStorage.getItem('userId');
            const res = await axios.get(`${VITE_HOST}/api/bookings/customer/${customerId}`);
            if (res.data.success) {
                setBookings(res.data.bookings);
            } else {
                setError('Failed to fetch bookings');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setError(`Error fetching bookings: ${error.message}`);
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.put(`${VITE_HOST}/api/bookings/cancel/${bookingId}`);
            if (res.data.success) {
                setBookings(bookings.filter(booking => booking._id !== bookingId));
            } else {
                setError('Failed to cancel booking');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error cancelling booking:', error);
            setError(`Error cancelling booking: ${error.message}`);
            setLoading(false);
        }
    };

    return (
        <div className="booking-history">
            <h2>Booking History</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : bookings.length === 0 ? (
                <p>No bookings found</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id}>
                            <p>Room: {booking.roomId.number} - {booking.roomId.type}</p>
                            <p>Check-in Date: {new Date(booking.checkInDate).toLocaleDateString()}</p>
                            <p>Check-out Date: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                            <button onClick={() => handleCancel(booking._id)}>Cancel Booking</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookingHistory;
