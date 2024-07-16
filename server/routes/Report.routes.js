// server/routes/report.routes.js
const express = require('express');
const router = express.Router();
const ReportController = require('../controller/Report.controller');

router.get('/booking-statistics', ReportController.getBookingStatistics);
router.get('/room-occupancy', ReportController.getRoomOccupancy);
router.get('/gross-sales', ReportController.getGrossSales);
// Add more routes here

module.exports = router;
