const BookingModel = require('../models/Booking.model');
const RoomModel = require('../models/Room.model');
const AuditLogModel = require('../models/AuditLog.model');

const logAudit = async (userId, action, details) => {
    await AuditLogModel.create({ userId, action, details });
};

const BookingController = {
    createBooking: async (req, res) => {
        try {
            const { roomId, customerId, checkInDate, checkOutDate, numberOfGuests, totalAmountPaid } = req.body;
            const booking = new BookingModel({ roomId, customerId, checkInDate, checkOutDate, numberOfGuests, totalAmountPaid });
            const savedBooking = await booking.save();
            await logAudit(customerId, 'createBooking', `Created booking for room ${roomId}`);

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
            const booking = await BookingModel.findByIdAndUpdate(id, { status: 'approved' }, { new: true }).populate('roomId');
            if (!booking) {
                return res.json({ success: false, message: 'Booking not found' });
            }

            await RoomModel.findByIdAndUpdate(booking.roomId._id, { status: 'booked' });
            await logAudit(req.user._id, 'approveBooking', `Approved booking ${id}`);

            res.json({ success: true, message: 'Booking approved successfully!', booking });
        } catch (error) {
            res.json({ success: false, message: `Error approving booking: ${error.message}` });
        }
    },

    rejectBooking: async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await BookingModel.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
            if (!booking) {
                return res.json({ success: false, message: 'Booking not found' });
            }
            await logAudit(req.user._id, 'rejectBooking', `Rejected booking ${id}`);

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
