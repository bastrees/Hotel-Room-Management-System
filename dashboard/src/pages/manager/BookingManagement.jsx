// src/pages/manager/BookingManagement.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingList from '../../components/BookingList/BookingList';


const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { VITE_HOST } = import.meta.env;

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${VITE_HOST}/api/bookings`);
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

    const handleApprove = async (id) => {
        try {
            await axios.put(`${VITE_HOST}/api/bookings/approve/${id}`);
            fetchBookings();
        } catch (error) {
            console.error('Error approving booking', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.put(`${VITE_HOST}/api/bookings/reject/${id}`);
            fetchBookings();
        } catch (error) {
            console.error('Error rejecting booking', error);
        }
    };

    return (
        <div className="booking-management">
            <h2>Booking Management</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <BookingList bookings={bookings} onApprove={handleApprove} onReject={handleReject} userRole="manager" />
            )}
        </div>
    );
};

export default BookingManagement;
