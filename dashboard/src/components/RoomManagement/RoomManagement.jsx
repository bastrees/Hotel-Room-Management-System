import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoomManagement.css';
import RoomModal from './RoomModal';

const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
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
                <ul>
                    {rooms.map((room) => (
                        <li key={room._id}>
                            <p>Room: {room.number} - {room.type}</p>
                            <p>Description: {room.description}</p>
                            <p>Price: ${room.price}</p>
                            <p>Status: {room.status}</p>
                            <button onClick={() => handleEdit(room)}>Edit</button>
                            <button onClick={() => handleDelete(room._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
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
