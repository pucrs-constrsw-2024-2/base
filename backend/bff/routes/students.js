const express = require('express');
const router = express.Router();
const { createStudent, getAllStudents, getStudents, putStudent, patchStudent, deleteStudent, getHealth } = require('../controllers/studentsController');

router.get('/health', getHealth);
router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudents);
router.put('/:id', putStudent);
router.patch('/:id', patchStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
