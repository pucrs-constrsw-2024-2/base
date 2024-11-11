const express = require('express');
const { createReference, getAllReferences, getReferenceById, updateReference, partialReferenceUpdate, deleteReference } = require('../controllers/referencesController');
const router = express.Router();

router.post('/:courseId/references', createReference);
router.get('/:courseId/references', getAllReferences);
router.get('/:courseId/references/:id', getReferenceById);
router.put('/:courseId/references/:id', updateReference);
router.patch('/:courseId/references/:id', partialReferenceUpdate);
router.delete('/:courseId/references/:id', deleteReference);

module.exports = router;
