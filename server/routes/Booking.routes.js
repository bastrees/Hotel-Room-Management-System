const express = require('express');
const router = express.Router();
const BookingController = require('../controller/Booking.controller');

// Booking routes
router.post('/bookings', BookingController.createBooking);
router.get('/bookings', BookingController.listBookings);
router.put('/bookings/cancel/:id', BookingController.cancelBooking);
router.put('/bookings/approve/:id', BookingController.approveBooking);
router.put('/bookings/reject/:id', BookingController.rejectBooking);
router.get('/bookings/customer/:customerId', BookingController.getBookingsByCustomerId);

module.exports = router;
