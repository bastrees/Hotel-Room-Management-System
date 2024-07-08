const express = require('express');
const router = express.Router();
const RoomController = require('../controller/Room.controller');

router.post('/rooms', RoomController.createRoom);
router.get('/rooms', RoomController.getAllRooms);
router.get('/rooms/:id', RoomController.getRoomById);
router.put('/rooms/:id', RoomController.updateRoom);
router.delete('/rooms/:id', RoomController.deleteRoom);

module.exports = router;
