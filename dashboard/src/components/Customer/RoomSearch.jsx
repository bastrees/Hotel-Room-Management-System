// src/components/Customer/RoomSearch.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomBookingModal from './RoomBookingModal';
import './RoomSearch.css';

// Importing images
import StandardRoom from '../../assets/images/StandardRoom.jpg';
import FamilyRoom from '../../assets/images/FamilyRoom.jpg';
import Deluxe from '../../assets/images/Deluxe.jpg';
import Suite from '../../assets/images/Suite.jpg';
import PresidentialSuite from '../../assets/images/PresidentialSuite.jpg';
import Villa from '../../assets/images/Villa.jpg';

const roomImages = {
    "Standard Room": StandardRoom,
    "Family Room": FamilyRoom,
    "Deluxe": Deluxe,
    "Suite": Suite,
    "Presidential Suite": PresidentialSuite,
    "Villa": Villa
};

const RoomSearch = () => {
    const [roomsByType, setRoomsByType] = useState({});
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { VITE_HOST } = import.meta.env;

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${VITE_HOST}/api/rooms`);
            if (res.data.success) {
                const availableRooms = res.data.rooms.filter(room => room.status !== 'booked');
                const groupedRooms = groupRoomsByType(availableRooms);
                setRoomsByType(groupedRooms);
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

    const groupRoomsByType = (rooms) => {
        return rooms.reduce((acc, room) => {
            if (!acc[room.type]) {
                acc[room.type] = [];
            }
            acc[room.type].push(room);
            return acc;
        }, {});
    };

    const handleCardClick = (room) => {
        setSelectedRoom(room);
        setModalIsOpen(true);
    };

    return (
        <div className="room-search">
            <h2>Search Rooms</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="room-type-columns">
                    {Object.keys(roomsByType).map((type) => (
                        <div key={type} className="room-type-column">
                            <h3>{type}</h3>
                            <div className="room-type-cards">
                                {roomsByType[type].map((room) => (
                                    <div className="room-card" key={room._id} onClick={() => handleCardClick(room)}>
                                        <img src={roomImages[room.type]} alt={room.type} className="room-image" />
                                        <p>Room: {room.number}</p>
                                        <p>Description: {room.description}</p>
                                        <p>Price: ${room.price}</p>
                                        <p>Status: {room.status}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <RoomBookingModal
                roomType={selectedRoom}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onBookingSubmit={() => {}} // Dummy function, we'll handle navigation in RoomBookingModal
            />
        </div>
    );
};

export default RoomSearch;
