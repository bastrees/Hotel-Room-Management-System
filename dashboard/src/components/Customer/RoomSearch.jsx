import React, { useState } from 'react';
import axios from 'axios';
import './RoomSearch.css';

const RoomSearch = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: 1,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { VITE_HOST } = import.meta.env;

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${VITE_HOST}/api/rooms`);
            if (res.data.success) {
                setRooms(res.data.rooms);
                console.log('Fetched rooms:', res.data.rooms);
            } else {
                setError('Failed to fetch rooms');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            setError(`Error fetching rooms: ${error.message}`);
            setLoading(false);
        }
    };

    const handleBook = (room) => {
        setSelectedRoom(room);
        setSuccess(null); // Reset success message when selecting a new room
    };

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
                roomId: selectedRoom._id,
                customerId,
                checkInDate: bookingDetails.checkInDate,
                checkOutDate: bookingDetails.checkOutDate,
                numberOfGuests: bookingDetails.numberOfGuests,
            });
            if (res.data.success) {
                setSuccess('Booking successful!');
                setSelectedRoom(null); // Reset selected room after booking
                setBookingDetails({
                    checkInDate: '',
                    checkOutDate: '',
                    numberOfGuests: 1,
                }); // Reset booking details
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
        <div className="room-search">
            <h2>Search Rooms</h2>
            <button onClick={handleSearch}>Search</button>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {rooms.map((room) => (
                        <li key={room._id}>
                            <p>Room: {room.number} - {room.type}</p>
                            <p>Description: {room.description}</p>
                            <p>Price: ${room.price}</p>
                            <button onClick={() => handleBook(room)}>Book</button>
                        </li>
                    ))}
                </ul>
            )}
            {selectedRoom && (
                <div className="room-booking">
                    <h2>Book Room</h2>
                    <p>Room: {selectedRoom.number} - {selectedRoom.type}</p>
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
                </div>
            )}
        </div>
    );
};

export default RoomSearch;
