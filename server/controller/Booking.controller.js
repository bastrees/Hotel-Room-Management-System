const BookingModel = require('../models/Booking.model');

const BookingController = {
    createBooking: async (req, res) => {
        try {
            const { roomId, customerId, checkInDate, checkOutDate, numberOfGuests } = req.body;
            const booking = new BookingModel({ roomId, customerId, checkInDate, checkOutDate, numberOfGuests });
            const savedBooking = await booking.save();
            res.json({ success: true, message: 'Booking created successfully!', booking: savedBooking });
        } catch (error) {
            res.json({ success: false, message: `Error creating booking: ${error.message}` });
        }
    },

    listBookings: async (req, res) => {
        try {
            const bookings = await BookingModel.find().populate('roomId');
            res.json({ success: true, bookings });
        } catch (error) {
            res.json({ success: false, message: `Error fetching bookings: ${error.message}` });
        }
    },

    cancelBooking: async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await BookingModel.findByIdAndDelete(id);
            if (!booking) {
                return res.json({ success: false, message: 'Booking not found' });
            }
            res.json({ success: true, message: 'Booking canceled successfully!' });
        } catch (error) {
            res.json({ success: false, message: `Error canceling booking: ${error.message}` });
        }
    },

    getBookingsByCustomerId: async (req, res) => {
        try {
            const { customerId } = req.params;
            const bookings = await BookingModel.find({ customerId }).populate('roomId');
            res.json({ success: true, bookings });
        } catch (error) {
            res.json({ success: false, message: `Error fetching bookings: ${error.message}` });
        }
    },
};

module.exports = BookingController;
