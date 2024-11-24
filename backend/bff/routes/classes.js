const express = require('express');
const router = express.Router();
const { createClass, getAllClasses, getClasses, putClass, patchClass, deleteClass, getHealth } = require('../controllers/classesController');

router.post('/', createClass);
router.get('/', getAllClasses);
router.get('/:id', getClasses);
router.put('/:id', putClass);
router.patch('/:id', patchClass);
router.delete('/:id', deleteClass);
router.get('/health', getHealth);

module.exports = router;
