// src/components/BookingList/BookingList.jsx

import React from 'react';

const BookingList = ({ bookings, onApprove, onReject, onCancel, userRole }) => {
    return (
        <div className="booking-list">
            {bookings.length === 0 ? (
                <p>No bookings found</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id} className="booking-item">
                            <div className="booking-info">
                                <p><strong>Customer Name:</strong> {booking.customerId.firstName} {booking.customerId.lastName}</p>
                                <p><strong>Room:</strong> {booking.roomId.number} - {booking.roomId.type}</p>
                                <p><strong>Check-in Date:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                                <p><strong>Check-out Date:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                                <p><strong>Number of Guests:</strong> {booking.numberOfGuests}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                            </div>
                            {userRole === 'customer' && booking.status === 'approved' && (
                                <div className="booking-actions">
                                    <button onClick={() => onCancel(booking._id)}>Cancel</button>
                                </div>
                            )}
                            {userRole !== 'customer' && booking.status === 'pending' && (
                                <div className="booking-actions">
                                    <button onClick={() => onApprove(booking._id)}>Approve</button>
                                    <button onClick={() => onReject(booking._id)}>Reject</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookingList;
