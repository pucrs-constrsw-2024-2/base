const express = require('express');
const router = express.Router();
const { createRoom, getAllRooms, getRooms, putRoom, patchRoom, deleteRoom, getHealth } = require('../controllers/roomsController');

router.post('/', createRoom);
router.get('/', getAllRooms);
router.get('/:id', getRooms);
router.put('/:id', putRoom);
router.patch('/:id', patchRoom);
router.delete('/:id', deleteRoom);
router.get('/health', getHealth);

module.exports = router;
