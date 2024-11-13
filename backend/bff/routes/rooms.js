const express = require('express');
const { createRoom, getAllRooms, getRoomById,fullRoomUpdate, partialRoomUpdate,deleteRoomById } = require('../controllers/roomsController');
const router = express.Router();

router.post('/', createRoom);
router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.put('/:id', fullRoomUpdate);
router.patch('/:id', partialRoomUpdate);
router.delete('/:id', deleteRoomById);

module.exports = router;