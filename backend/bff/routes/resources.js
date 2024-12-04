const express = require("express");
const router = express.Router();
const { createResource, getAllResources, getResources, putResource, patchResource, deleteResource, getHealth } = require('../controllers/resourcesController');

router.get('/health', getHealth);
router.post('/', createResource);
router.get('/', getAllResources);
router.get('/:id', getResources);
router.put('/:id', putResource);
router.patch('/:id', patchResource);
router.delete('/:id', deleteResource);

module.exports = router;
