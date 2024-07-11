import React from 'react';
import './RoomTypeCard.css';

const RoomTypeCard = ({ roomType, onCardClick }) => {
    // Dynamically import the image based on the room type
    const imagePath = `/src/assets/images/${roomType.type.replace(/\s+/g, '')}.jpg`;

    return (
        <div className="room-type-card" onClick={() => onCardClick(roomType)}>
            <img src={imagePath} alt={roomType.type} className="room-type-image" />
            <h3>{roomType.type}</h3>
            <p>{roomType.description}</p>
        </div>
    );
};

export default RoomTypeCard;
