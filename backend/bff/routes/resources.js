const express = require('express');
const { createResource, deleteResourceById, fullResourceUpdate, getAllResources, getResourceById, partialResourceUpdate} = require('../controllers/ResourcesController');
const router = express.Router();

router.post('/', createResource);
router.get('/', getAllResources);
router.get('/:id', getResourceById);
router.put('/:id', fullResourceUpdate);
router.patch('/:id', partialResourceUpdate);
router.delete('/:id', deleteResourceById);

module.exports = router;
