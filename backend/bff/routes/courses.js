const express = require('express');
const { createCourse, getAllCourses, getCourseById, fullCourseUpdate, partialCourseUpdate, deleteCourseById } = require('../controllers/coursesController');
const router = express.Router();

router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.put('/:id', fullCourseUpdate);
router.patch('/:id', partialCourseUpdate);
router.delete('/:id', deleteCourseById);

module.exports = router;
