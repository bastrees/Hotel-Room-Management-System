import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoomBooking.css';

const RoomBooking = ({ room, onClose }) => {
    const [bookingDetails, setBookingDetails] = useState({
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: 1,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { VITE_HOST } = import.meta.env;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleBooking = async () => {
        setLoading(true);
        setError(null);
        try {
            const customerId = localStorage.getItem('userId');
            const res = await axios.post(`${VITE_HOST}/api/bookings`, {
                roomId: room._id,
                customerId,
                checkInDate: bookingDetails.checkInDate,
                checkOutDate: bookingDetails.checkOutDate,
                numberOfGuests: bookingDetails.numberOfGuests,
            });
            if (res.data.success) {
                setSuccess('Booking successful!');
            } else {
                setError('Failed to book room');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error booking room:', error);
            setError(`Error booking room: ${error.message}`);
            setLoading(false);
        }
    };

    return (
        room ? (
            <div className="room-booking">
                <h2>Book Room</h2>
                <p>Room: {room.number} - {room.type}</p>
                <label htmlFor="checkInDate">Check-in Date:</label>
                <input
                    type="date"
                    name="checkInDate"
                    value={bookingDetails.checkInDate}
                    onChange={handleChange}
                    placeholder="Check-in Date"
                    id="checkInDate"
                />
                <label htmlFor="checkOutDate">Check-out Date:</label>
                <input
                    type="date"
                    name="checkOutDate"
                    value={bookingDetails.checkOutDate}
                    onChange={handleChange}
                    placeholder="Check-out Date"
                    id="checkOutDate"
                />
                <label htmlFor="numberOfGuests">Number of Guests:</label>
                <input
                    type="number"
                    name="numberOfGuests"
                    value={bookingDetails.numberOfGuests}
                    onChange={handleChange}
                    placeholder="Number of Guests"
                    min="1"
                    id="numberOfGuests"
                />
                <button onClick={handleBooking} disabled={loading}>Book</button>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
                <button onClick={onClose}>Close</button>
            </div>
        ) : (
            <p>Loading room data...</p>
        )
    );
};

export default RoomBooking;
