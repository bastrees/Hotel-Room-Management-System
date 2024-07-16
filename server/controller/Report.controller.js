const BookingModel = require('../models/Booking.model');
const RoomModel = require('../models/Room.model');

const ReportController = {
    getBookingStatistics: async (req, res) => {
        try {
            const totalBookings = await BookingModel.countDocuments();
            const bookingsLastWeek = await BookingModel.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().setDate(new Date().getDate() - 7))
                }
            });
            res.json({
                success: true,
                totalBookings,
                bookingsLastWeek
            });
        } catch (error) {
            res.json({ success: false, message: `Error fetching booking statistics: ${error.message}` });
        }
    },

    getRoomOccupancy: async (req, res) => {
        try {
            const rooms = await RoomModel.find();
            const occupancyRates = rooms.reduce((acc, room) => {
                if (!acc[room.type]) {
                    acc[room.type] = { total: 0, occupied: 0 };
                }
                acc[room.type].total += 1;
                if (room.status === 'booked') {
                    acc[room.type].occupied += 1;
                }
                return acc;
            }, {});
            res.json({
                success: true,
                occupancyRates
            });
        } catch (error) {
            res.json({ success: false, message: `Error fetching room occupancy: ${error.message}` });
        }
    },

    getGrossSales: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const bookings = await BookingModel.find({ status: 'approved' })
                .skip((page - 1) * limit)
                .limit(Number(limit))
                .sort({ createdAt: -1 });

            const totalBookings = await BookingModel.countDocuments({ status: 'approved' });
            const grossSales = bookings.reduce((total, booking) => total + booking.totalAmountPaid, 0);

            res.json({
                success: true,
                grossSales,
                bookings,
                totalPages: Math.ceil(totalBookings / limit),
                currentPage: Number(page),
            });
        } catch (error) {
            res.json({ success: false, message: `Error fetching gross sales: ${error.message}` });
        }
    }
};

module.exports = ReportController;
