const express = require('express');
const router = express.Router();
const { createReservation, getAllReservations, getReservations, putReservation, patchReservation, deleteReservation, getHealth } = require('../controllers/reservationsController');

router.post('/', createReservation);
router.get('/', getAllReservations);
router.get('/:id', getReservations);
router.put('/:id', putReservation);
router.patch('/:id', patchReservation);
router.delete('/:id', deleteReservation);
router.get('/health', getHealth);

module.exports = router;