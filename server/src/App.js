const express = require('express');
const cors = require('cors');
const app = express();

const connectDb = require('../config/db');

const UserRoute = require('../routes/User.routes');
const RoomRoute = require('../routes/Room.routes');

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
}));

connectDb();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome'
    });
});

app.use('/api', UserRoute);
app.use('/api', RoomRoute); // Ensure this line is present

module.exports = app;
