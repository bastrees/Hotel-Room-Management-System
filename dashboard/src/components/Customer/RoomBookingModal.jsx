import React from 'react';
import './RoomBookingModal.css';

const RoomBookingModal = ({ roomType, isOpen, onRequestClose, onBookingSubmit }) => {
    const [bookingDetails, setBookingDetails] = React.useState({
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onBookingSubmit(bookingDetails);
    };

    if (!isOpen) {
        return null;
    }

    // Dynamically import the image based on room type
    const imagePath = `/src/assets/images/${roomType.type.replace(/\s+/g, '')}.jpg`;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{roomType.type}</h2>
                <img src={imagePath} alt={roomType.type} className="modal-image" />
                <p>{roomType.description}</p>
                <p>Price: ${roomType.price}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="checkInDate">Check-in Date:</label>
                    <input
                        type="date"
                        name="checkInDate"
                        value={bookingDetails.checkInDate}
                        onChange={handleChange}
                    />
                    <label htmlFor="checkOutDate">Check-out Date:</label>
                    <input
                        type="date"
                        name="checkOutDate"
                        value={bookingDetails.checkOutDate}
                        onChange={handleChange}
                    />
                    <label htmlFor="numberOfGuests">Number of Guests:</label>
                    <input
                        type="number"
                        name="numberOfGuests"
                        value={bookingDetails.numberOfGuests}
                        onChange={handleChange}
                        min="1"
                    />
                    <button type="submit">Book</button>
                    <button type="button" onClick={onRequestClose} className="cancel-button">Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default RoomBookingModal;
