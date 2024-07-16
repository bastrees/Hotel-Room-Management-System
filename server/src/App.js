const express = require('express');
const cors = require('cors');
const app = express();

const ConnectToDatabase = require('../config/db');
const UserRoute = require('../routes/User.routes');
const RoomRoute = require('../routes/Room.routes');
const BookingRoute = require('../routes/Booking.routes');
const ReportRoute = require('../routes/Report.routes');

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
}));

ConnectToDatabase();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: `Welcome`
    });
});

app.use('/api', UserRoute);
app.use('/api', RoomRoute);
app.use('/api', BookingRoute);
app.use('/api/reports', ReportRoute);

module.exports = app;
