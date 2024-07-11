import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoomManagement.css'; // Import the CSS file
import RoomModal from './RoomModal';

const RoomManagement = () => {
    const [roomsByType, setRoomsByType] = useState({});
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
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
                const rooms = res.data.rooms.reduce((acc, room) => {
                    if (!acc[room.type]) acc[room.type] = [];
                    acc[room.type].push(room);
                    return acc;
                }, {});
                setRoomsByType(rooms);
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

    const handleEdit = (room) => {
        setSelectedRoom(room);
        setModalIsOpen(true);
    };

    const handleAddRoom = () => {
        setSelectedRoom(null);
        setModalIsOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${VITE_HOST}/api/rooms/${id}`);
            fetchRooms();
        } catch (error) {
            console.error('Error deleting room', error);
        }
    };

    const handleSave = async (room) => {
        try {
            if (room._id) {
                await axios.put(`${VITE_HOST}/api/rooms/${room._id}`, room);
            } else {
                await axios.post(`${VITE_HOST}/api/rooms`, room);
            }
            fetchRooms();
            setModalIsOpen(false);
        } catch (error) {
            console.error('Error saving room', error);
        }
    };

    return (
        <div className="room-management">
            <h2>Room Management</h2>
            <button onClick={handleAddRoom}>Add Room</button>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="room-type-columns">
                    {Object.keys(roomsByType).map((type) => (
                        <div key={type} className="room-type-column">
                            <h3>{type}</h3>
                            <div className="room-grid">
                                {roomsByType[type].map((room) => (
                                    <div key={room._id} className="room-card">
                                        <p><strong>Room {room.number}</strong></p>
                                        <p>Type: {room.type}</p>
                                        <p>Description: {room.description}</p>
                                        <p>Price: ${room.price}</p>
                                        <p>Status: {room.status}</p>
                                        <div className="button-container">
                                            <button onClick={() => handleEdit(room)}>Edit</button>
                                            <button onClick={() => handleDelete(room._id)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {modalIsOpen && (
                <RoomModal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    room={selectedRoom}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default RoomManagement;
