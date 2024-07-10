import React from 'react';
import './RoomTypeCard.css';

const RoomTypeCard = ({ roomType, onCardClick }) => {
    return (
        <div className="room-type-card" onClick={() => onCardClick(roomType)}>
            <img src={roomType.image} alt={roomType.type} className="room-type-image" />
            <h3>{roomType.type}</h3>
            <p>{roomType.description}</p>
        </div>
    );
};

export default RoomTypeCard;
