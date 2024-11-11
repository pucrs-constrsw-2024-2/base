const express = require('express');
const { createFeature, getAllFeatures, getFeatureById, deleteFeatureById,partialFeatureUpdate, fullFeatureUpdate } = require('../controllers/featuresController');
const router = express.Router();

router.post('/:roomId/features', createFeature);
router.get('/:roomId/features', getAllFeatures);
router.get('/:roomId/features/:id', getFeatureById);
router.put('/:roomId/features/:id', fullFeatureUpdate);
router.patch('/:roomId/features/:id', partialFeatureUpdate);
router.delete('/:roomId/features/:id', deleteFeatureById);

module.exports = router;