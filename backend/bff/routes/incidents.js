const express = require('express');
const { createIncident, deleteIncidentById, fullIncidentUpdate, getAllIncidents, getIncidentById, partialIncidentUpdate} = require('../controllers/ResourcesController');
const router = express.Router();

router.post('/', createIncident);
router.get('/', getAllIncidents);
router.get('/:id', getIncidentById);
router.put('/:id', fullIncidentUpdate);
router.patch('/:id', partialIncidentUpdate);
router.delete('/:id', deleteIncidentById);

module.exports = router;
