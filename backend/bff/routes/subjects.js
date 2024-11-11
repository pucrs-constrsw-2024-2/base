const express = require('express');
const { createSubject, getAllSubjects, getSubjectById, fullSubjectUpdate, partialSubjectUpdate, deleteSubjectById } = require('../controllers/subjectsController');
const router = express.Router();

router.post('/', createSubject);
router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);
router.put('/:id', fullSubjectUpdate);
router.patch('/:id', partialSubjectUpdate);
router.delete('/:id', deleteSubjectById);

module.exports = router;