const express = require('express');
const router = express.Router();
const { createStudent, getAllStudents, getStudents, putStudent, patchStudent, deleteStudent, getHealth } = require('../controllers/studentsController');

router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudents);
router.put('/:id', putStudent);
router.patch('/:id', patchStudent);
router.delete('/:id', deleteStudent);
router.get('/health', getHealth);

module.exports = router;