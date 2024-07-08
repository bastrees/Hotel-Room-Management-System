import React, { useState, useEffect } from 'react';

const RoomForm = ({ room, onSave, onCancel }) => {
    const [values, setValues] = useState({
        number: room?.number || '',
        type: room?.type || 'Standard Room',
        price: room?.price || '',
        description: room?.description || '',
        status: room?.status || 'available'
    });

    useEffect(() => {
        if (room) {
            setValues({
                number: room.number,
                type: room.type,
                price: room.price,
                description: room.description,
                status: room.status
            });
        }
    }, [room]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...values, _id: room?._id });
    };

    return (
        <div className="room-form">
            <h2>{room ? 'Edit Room' : 'Add Room'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="number"
                    value={values.number}
                    onChange={handleChange}
                    placeholder="Room Number"
                    required
                    readOnly={!!room}
                />
                <select name="type" value={values.type} onChange={handleChange}>
                    <option value="Standard Room">Standard Room</option>
                    <option value="Family Room">Family Room</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Presidential Suite">Presidential Suite</option>
                    <option value="Villa">Villa</option>
                </select>
                <input
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <textarea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <select name="status" value={values.status} onChange={handleChange}>
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                </select>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default RoomForm;
