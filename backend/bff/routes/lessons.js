const express = require('express');
const { createLesson, getAllLessons, getLessonById, fullLessonUpdate, partialLessonUpdate, deleteLessonById } = require('../controllers/lessonsController');
const router = express.Router();

router.post('/', createLesson);
router.get('/', getAllLessons);
router.get('/:id', getLessonById);
router.put('/:id', fullLessonUpdate);
router.patch('/:id', partialLessonUpdate);
router.delete('/:id', deleteLessonById);

module.exports = router;