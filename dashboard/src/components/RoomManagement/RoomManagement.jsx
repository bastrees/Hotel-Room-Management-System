import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomList from './RoomList';
import RoomModal from './RoomModal';
import './RoomManagement.css';

const RoomManagement = () => {
    const [roomsByType, setRoomsByType] = useState({});
    const [editingRoom, setEditingRoom] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('http://localhost:3001/api/rooms');
            if (res.data.success) {
                setRoomsByType(res.data.rooms);
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/rooms/${id}`);
            fetchRooms();
        } catch (error) {
            console.error('Error deleting room', error);
        }
    };

    const handleEdit = (room) => {
        setEditingRoom(room);
        setModalIsOpen(true);
    };

    const handleAddRoom = () => {
        setEditingRoom(null);
        setModalIsOpen(true);
    };

    const handleSave = async (room) => {
        try {
            if (room._id) {
                await axios.put(`http://localhost:3001/api/rooms/${room._id}`, room);
            } else {
                await axios.post('http://localhost:3001/api/rooms', room);
            }
            fetchRooms();
            setModalIsOpen(false);
        } catch (error) {
            console.error('Error saving room', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Room Management</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <button className="add-room-button" onClick={handleAddRoom}>Add Room</button>
                    {Object.keys(roomsByType).map((type) => (
                        <div key={type} className="room-type-section">
                            <h2>{type}</h2>
                            <RoomList rooms={roomsByType[type]} onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                    ))}
                    <RoomModal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        room={editingRoom}
                        onSave={handleSave}
                    />
                </>
            )}
        </div>
    );
};

export default RoomManagement;
