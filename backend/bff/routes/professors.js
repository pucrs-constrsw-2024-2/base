const express = require('express');
const { createProfessor, getProfessors, getProfessorById, putProfessor, patchProfessorName, deleteProfessor } = require('../controllers/professorsController');
const router = express.Router();

router.post('/', createProfessor);
router.get('/', getProfessors);
router.get('/:id', getProfessorById);
router.put('/:id', putProfessor);
router.patch('/:id', patchProfessorName);
router.delete('/:id', deleteProfessor);

module.exports = router;