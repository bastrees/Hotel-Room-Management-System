import React from 'react';

const RoomList = ({ rooms, onDelete, onEdit }) => {
    return (
        <div className="room-list">
            {rooms.length === 0 ? (
                <p>No rooms found</p>
            ) : (
                <ul>
                    {rooms.map((room) => (
                        <li key={room._id} className="room-item">
                            <div className="room-info">
                                <p><strong>Room Number - {room.number}</strong></p>
                                <p><strong>Room Type:</strong> {room.type}</p>
                                <p><strong>Description:</strong> {room.description}</p>
                                <p><strong>Price:</strong> ${room.price}</p>
                                <p><strong>Availability:</strong> {room.status}</p>
                            </div>
                            <div className="room-actions">
                                <button onClick={() => onEdit(room)}>Edit</button>
                                <button onClick={() => onDelete(room._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RoomList;
