const express = require('express');
const { createReservation, deleteReservationById, fullReservationUpdate, getAllReservations, getReservationById, partialReservationUpdate} = require('../controllers/reservationsController');
const router = express.Router();

router.post('/', createReservation);
router.get('/', getAllReservations);
router.get('/:id', getReservationById);
router.put('/:id', fullReservationUpdate);
router.patch('/:id', partialReservationUpdate);
router.delete('/:id', deleteReservationById);

module.exports = router;