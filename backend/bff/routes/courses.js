const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses, getCourses, putCourse, patchCourse, deleteCourse, getHealth } = require('../controllers/coursesController');

router.get('/health', getHealth);
router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/health', getHealth);
router.get('/:id', getCourses);
router.put('/:id', putCourse);
router.patch('/:id', patchCourse);
router.delete('/:id', deleteCourse);

module.exports = router;