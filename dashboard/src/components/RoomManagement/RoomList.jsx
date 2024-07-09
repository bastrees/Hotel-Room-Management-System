import React from 'react';


const RoomList = ({ rooms, onDelete, onEdit }) => {
    console.log('Rooms received by RoomList:', rooms); // Debugging log
    return (
        <div className="room-list">
            {rooms && rooms.length === 0 ? (
                <p>No rooms found</p>
            ) : (
                <ul>
                    {Array.isArray(rooms) && rooms.map((room) => (
                        <li key={room._id} className="room-item">
                            <div className="room-info">
                                <p><strong>Room Number:</strong> {room.number}</p>
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
