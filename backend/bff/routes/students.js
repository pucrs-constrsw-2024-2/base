const express = require('express');
const router = express.Router();
const {
    createStudent, getAllStudents, getStudents, putStudent, patchStudent, deleteStudent, getHealth, createResult, getResults, getResultById, putResult, patchResult, deleteResult
} = require('../controllers/studentsController');

router.get('/health', getHealth);
router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudents);
router.put('/:id', putStudent);
router.patch('/:id', patchStudent);
router.delete('/:id', deleteStudent);

router.post('/:id/results', createResult);
router.get('/:id/results', getResults);
router.get('/:id/results/:resultId', getResultById);
router.put('/:id/results/:resultId', putResult);
router.patch('/:id/results/:resultId', patchResult);
router.delete('/:id/results/:resultId', deleteResult);

module.exports = router;
