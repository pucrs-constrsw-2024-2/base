const express = require('express');
const router = express.Router();
const { createClass, deleteClass, getClasses, getClassesByQuery, putClass, patchClass } = require('../controllers/classesController');

router.post('/classes/', createClass);
router.get('/classes/', getClasses);
router.get('/classes/:id', getClasses);
router.get('/classes/query', getClassesByQuery);
router.put('/classes/:id', putClass);
router.patch('/classes/:id', patchClass);
router.delete('/classes/:id', deleteClass);

module.exports = router;