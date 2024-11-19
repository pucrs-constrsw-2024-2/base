const express = require('express');
const router = express.Router();
const { createResource, getAllResources, getResources, putResource, patchResource, deleteResource, getHealth } = require('../controllers/resourcesController');

router.post('/', createResource);
router.get('/', getAllResources);
router.get('/:id', getResources);
router.put('/:id', putResource);
router.patch('/:id', patchResource);
router.delete('/:id', deleteResource);
router.get('/health', getHealth);

module.exports = router;