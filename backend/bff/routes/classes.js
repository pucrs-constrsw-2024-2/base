const express = require('express');
const router = express.Router();
const { createClass, deleteClass, getClasses, getClassById, putClass, patchClass } = require('../controllers/classesController');

router.post('/', createClass);
router.get('/', getClasses);
router.get('/:id', getClassById);
router.put('/:id', putClass);
router.patch('/:id', patchClass);
router.delete('/:id', deleteClass);

module.exports = router;
