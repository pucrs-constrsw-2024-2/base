const express = require('express');
const router = express.Router();
const { createClass, deleteClass, getClasses, getClassById, putClass, patchClass, getHealth } = require('../controllers/classesController');
const { createGrade, getGrades, getGradeById, putGrade, patchGrade, deleteGrade } = require('../controllers/gradesController');

router.get('/health', getHealth);
router.post('/', createClass);
router.get('/', getClasses);
router.get('/:id', getClassById);
router.put('/:id', putClass);
router.patch('/:id', patchClass);
router.delete('/:id', deleteClass);

router.post('/:classId/grades', createGrade);
router.get('/:classId/grades', getGrades);
router.get('/:classId/grades/:gradeId', getGradeById);
router.put('/:classId/grades/:gradeId', putGrade);
router.patch('/:classId/grades/:gradeId', patchGrade);
router.delete('/:classId/grades/:gradeId', deleteGrade);

module.exports = router;
