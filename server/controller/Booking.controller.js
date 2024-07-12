const BookingModel = require('../models/Booking.model');
const RoomModel = require('../models/Room.model');

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
            const bookings = await BookingModel.find().populate('roomId').populate('customerId');
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

    approveBooking: async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await BookingModel.findByIdAndUpdate(id, { status: 'approved' }, { new: true }).populate('roomId').populate('customerId');
            if (!booking) {
                return res.json({ success: false, message: 'Booking not found' });
            }

            await RoomModel.findByIdAndUpdate(booking.roomId._id, { status: 'booked' });

            res.json({ success: true, message: 'Booking approved successfully!', booking });
        } catch (error) {
            res.json({ success: false, message: `Error approving booking: ${error.message}` });
        }
    },

    rejectBooking: async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await BookingModel.findByIdAndUpdate(id, { status: 'rejected' }, { new: true }).populate('customerId');
            if (!booking) {
                return res.json({ success: false, message: 'Booking not found' });
            }
            res.json({ success: true, message: 'Booking rejected successfully!', booking });
        } catch (error) {
            res.json({ success: false, message: `Error rejecting booking: ${error.message}` });
        }
    },

    getBookingsByCustomerId: async (req, res) => {
        try {
            const { customerId } = req.params;
            const bookings = await BookingModel.find({ customerId }).populate('roomId').populate('customerId');
            res.json({ success: true, bookings });
        } catch (error) {
            res.json({ success: false, message: `Error fetching bookings: ${error.message}` });
        }
    },
};

module.exports = BookingController;
