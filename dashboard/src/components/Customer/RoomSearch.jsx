import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomTypeCard from './RoomTypeCard';
import RoomBookingModal from './RoomBookingModal';


const RoomSearch = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { VITE_HOST } = import.meta.env;

    useEffect(() => {
        fetchRoomTypes();
    }, []);

    const fetchRoomTypes = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${VITE_HOST}/api/rooms`);
            if (res.data.success) {
                setRoomTypes(res.data.rooms);
                console.log('Fetched room types:', res.data.rooms);
            } else {
                setError('Failed to fetch room types');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching room types:', error);
            setError(`Error fetching room types: ${error.message}`);
            setLoading(false);
        }
    };

    const handleCardClick = (roomType) => {
        setSelectedRoomType(roomType);
        setModalIsOpen(true);
    };

    const handleBookingSubmit = async (bookingDetails) => {
        setLoading(true);
        setError(null);
        try {
            const customerId = localStorage.getItem('userId');
            const res = await axios.post(`${VITE_HOST}/api/bookings`, {
                ...bookingDetails,
                roomId: selectedRoomType._id,
                customerId,
            });
            if (res.data.success) {
                alert('Booking successful!');
                setModalIsOpen(false);
                setSelectedRoomType(null);
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
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="room-type-cards">
                    {roomTypes.map((roomType) => (
                        <RoomTypeCard key={roomType._id} roomType={roomType} onCardClick={handleCardClick} />
                    ))}
                </div>
            )}
            <RoomBookingModal
                roomType={selectedRoomType}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onBookingSubmit={handleBookingSubmit}
            />
        </div>
    );
};

export default RoomSearch;
