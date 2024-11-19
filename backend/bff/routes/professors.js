const express = require('express');
const router = express.Router();
const { createProfessor, getAllProfessors, getProfessors, putProfessor, patchProfessor, deleteProfessor, getHealth } = require('../controllers/professorsController');

router.post('/', createProfessor);
router.get('/', getAllProfessors);
router.get('/:id', getProfessors);
router.put('/:id', putProfessor);
router.patch('/:id', patchProfessor);
router.delete('/:id', deleteProfessor);
router.get('/health', getHealth);

module.exports = router;