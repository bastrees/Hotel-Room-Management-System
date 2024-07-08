const RoomModel = require('../models/Room.model');

const RoomController = {
    createRoom: async (req, res) => {
        try {
            const { number, type, price, description } = req.body;
            const room = new RoomModel({ number, type, price, description });
            const savedRoom = await room.save();
            res.json({ success: true, message: 'Room created successfully!', room: savedRoom });
        } catch (error) {
            res.json({ success: false, message: `Error creating room: ${error.message}` });
        }
    },

    getAllRooms: async (req, res) => {
        try {
            const rooms = await RoomModel.find();
            const roomsByType = rooms.reduce((acc, room) => {
                if (!acc[room.type]) {
                    acc[room.type] = [];
                }
                acc[room.type].push(room);
                return acc;
            }, {});
            res.json({ success: true, rooms: roomsByType });
        } catch (error) {
            res.json({ success: false, message: `Error fetching rooms: ${error.message}` });
        }
    },

    getRoomById: async (req, res) => {
        try {
            const { id } = req.params;
            const room = await RoomModel.findById(id);
            if (!room) {
                return res.json({ success: false, message: 'Room not found' });
            }
            res.json({ success: true, room });
        } catch (error) {
            res.json({ success: false, message: `Error fetching room: ${error.message}` });
        }
    },

    updateRoom: async (req, res) => {
        try {
            const { id } = req.params;
            const { number, type, price, description, status } = req.body;
            const updatedRoom = await RoomModel.findByIdAndUpdate(
                id,
                { number, type, price, description, status },
                { new: true }
            );
            if (!updatedRoom) {
                return res.json({ success: false, message: 'Room not found' });
            }
            res.json({ success: true, message: 'Room updated successfully!', room: updatedRoom });
        } catch (error) {
            res.json({ success: false, message: `Error updating room: ${error.message}` });
        }
    },

    deleteRoom: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedRoom = await RoomModel.findByIdAndDelete(id);
            if (!deletedRoom) {
                return res.json({ success: false, message: 'Room not found' });
            }
            res.json({ success: true, message: 'Room deleted successfully!' });
        } catch (error) {
            res.json({ success: false, message: `Error deleting room: ${error.message}` });
        }
    }
};

module.exports = RoomController;
