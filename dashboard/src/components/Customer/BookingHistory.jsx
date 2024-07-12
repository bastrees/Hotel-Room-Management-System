// src/components/Customer/BookingHistory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingList from '../BookingList/BookingList';
import PaymentForm from '../Customer/PaymentForm';
import './BookingHistory.css';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
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

    const handleCancel = async (id) => {
        try {
            await axios.put(`${VITE_HOST}/api/bookings/cancel/${id}`);
            fetchBookings();
        } catch (error) {
            console.error('Error canceling booking', error);
        }
    };

    const handlePaymentSuccess = async () => {
        if (selectedBooking) {
            try {
                await axios.put(`${VITE_HOST}/api/bookings/update-status/${selectedBooking._id}`);
                fetchBookings();
            } catch (error) {
                console.error('Error updating booking status:', error);
            }
        }
    };

    return (
        <div className="booking-history">
            <h2>Booking History</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <BookingList bookings={bookings} onCancel={handleCancel} userRole="customer" />
                    {selectedBooking && (
                        <PaymentForm
                            bookingId={selectedBooking._id}
                            amount={selectedBooking.roomId.price}
                            onPaymentSuccess={handlePaymentSuccess}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default BookingHistory;
