const express = require('express');
const { createStudent, getStudents, getStudentById, putStudent, patchStudentName, deleteStudent } = require('../controllers/studentsController');
const router = express.Router();

router.post('/', createStudent);
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.put('/:id', putStudent);
router.patch('/:id', patchStudentName);
router.delete('/:id', deleteStudent);

module.exports = router;