const express = require('express');
const router = express.Router();
const { createLesson, getAllLessons, getLessons, putLesson, patchLesson, deleteLesson, getHealth } = require('../controllers/lessonsController');

router.get('/health', getHealth);
router.post('/', createLesson);
router.get('/', getAllLessons);
router.get('/:id', getLessons);
router.put('/:id', putLesson);
router.patch('/:id', patchLesson);
router.delete('/:id', deleteLesson);

module.exports = router;
