// src/components/Customer/PaymentForm.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentForm.css';

const PaymentForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { roomId, checkInDate, checkOutDate, numberOfGuests, totalCost } = location.state;
    const [paymentDetails, setPaymentDetails] = useState({
        debitAccount: '',
        creditAccount: '',
        amount: totalCost,
    });
    const { VITE_HOST } = import.meta.env;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleTransfer = async () => {
        try {
            const token = "$2b$10$fX93xp0J4IQg/sJg5BS2oerADDj0lja8JxLyy96UmOavD0Xo/cqo."; // Your actual token

            const res = await axios.post(
                'http://192.168.10.14:3001/api/unionbank/transfertransaction',
                paymentDetails,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res?.data?.data);
            alert('Payment successful!');
            saveBooking();
        } catch (error) {
            console.error(error);
            alert(`Error processing payment: ${error.message}`);
        }
    };

    const saveBooking = async () => {
        try {
            const customerId = localStorage.getItem('userId');
            const bookingDetails = {
                roomId,
                customerId,
                checkInDate,
                checkOutDate,
                numberOfGuests,
            };

            const res = await axios.post(`${VITE_HOST}/api/bookings`, bookingDetails);

            if (res.data.success) {
                alert('Booking saved successfully!');
                navigate('/customer/booking-history');
            } else {
                alert('Failed to save booking');
            }
        } catch (error) {
            console.error('Error saving booking:', error);
            alert(`Error saving booking: ${error.message}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleTransfer();
    };

    return (
        <div className="payment-form">
            <h2>Payment Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="debitAccount">Debit Account:</label>
                <input
                    type="text"
                    name="debitAccount"
                    value={paymentDetails.debitAccount}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="creditAccount">Credit Account:</label>
                <input
                    type="text"
                    name="creditAccount"
                    value={paymentDetails.creditAccount}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={paymentDetails.amount}
                    readOnly
                />
                <button type="submit">Pay</button>
            </form>
        </div>
    );
};

export default PaymentForm;
