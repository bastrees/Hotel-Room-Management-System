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
        bank: ''
    });
    const [actualCreditAccount, setActualCreditAccount] = useState('');
    const { VITE_HOST } = import.meta.env;

    const handleBankChange = (e) => {
        const bank = e.target.value;
        let creditAccount = '';
        let actualAccount = '';

        if (bank === 'unionbank') {
            creditAccount = '*********020';
            actualAccount = '000000020';
        } else if (bank === 'metrobank') {
            creditAccount = '*********123'; // Placeholder for Metrobank account number
            actualAccount = '000000123'; // Replace with actual Metrobank account number
        }

        setPaymentDetails((prev) => ({ ...prev, bank, creditAccount }));
        setActualCreditAccount(actualAccount);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleTransfer = async () => {
        try {
            const token = "$2b$10$J/3l8q58ya6fhW1.0UxaDeshbTEmDLusHYlER.C7kGo0p6fAXSYpi"; // Your actual token

            const bankUrl = paymentDetails.bank === 'unionbank'
                ? 'http://192.168.10.14:3001/api/unionbank/transfertransaction'
                : 'http://your-metrobank-api-endpoint'; // Replace with actual Metrobank API endpoint

            const res = await axios.post(
                bankUrl,
                {
                    ...paymentDetails,
                    creditAccount: actualCreditAccount  // Use the actual account number
                },
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
                totalAmountPaid: totalCost  // Add total amount paid
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
                <label htmlFor="bank">Bank:</label>
                <select name="bank" value={paymentDetails.bank} onChange={handleBankChange} required>
                    <option value="">Select a Bank</option>
                    <option value="unionbank">UnionBank</option>
                    <option value="metrobank">MetroBank</option>
                </select>
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
                    readOnly
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
