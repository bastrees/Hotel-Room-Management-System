import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './css/Home.css';

Modal.setAppElement('#root');

export default function Home() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
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
                setRooms(res.data.rooms);
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

    const openModal = (room) => {
        setSelectedRoom(room);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedRoom(null);
        setModalIsOpen(false);
    };

    return (
        <div className="home-container">
            <h1>Welcome to HRMS</h1>
            <p>Your one-stop solution for hotel room management</p>
            <div className="home-buttons">
                <a href="/login" className="home-button">Login</a>
                <a href="/signup" className="home-button">Sign Up</a>
            </div>
            {loading ? (
                <p>Loading rooms...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul className="room-list">
                    {rooms.map((room) => (
                        <li key={room._id} className="room-item" onClick={() => openModal(room)}>
                            <h3>Room {room.number} - {room.type}</h3>
                            <p>{room.description}</p>
                            <p><strong>Price:</strong> ${room.price}</p>
                            <p><strong>Status:</strong> {room.status}</p>
                        </li>
                    ))}
                </ul>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Room Details"
                className="room-modal"
                overlayClassName="room-modal-overlay"
            >
                {selectedRoom && (
                    <div className="room-details">
                        <h2>Room {selectedRoom.number} - {selectedRoom.type}</h2>
                        <p>{selectedRoom.description}</p>
                        <p><strong>Price:</strong> ${selectedRoom.price}</p>
                        <p><strong>Status:</strong> {selectedRoom.status}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                )}
            </Modal>
        </div>
    );
}
