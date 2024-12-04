const express = require('express');
const {
    createProfessor,
    getProfessors,
    getProfessorById,
    putProfessor,
    patchProfessor,
    deleteProfessor,
    createBackground,
    getBackgroundsByProfessor,
    getBackgroundById,
    putBackground,
    patchBackground,
    deleteBackground,
    healthCheck,
} = require('../controllers/professorsController');
const router = express.Router();

// Health check
router.get('/health', healthCheck);

// Professors routes
router.post('', createProfessor);
router.get('', getProfessors);
router.get('/:id', getProfessorById);
router.put('/:id', putProfessor);
router.patch('/:id', patchProfessor);
router.delete('/:id', deleteProfessor);

// Backgrounds routes
router.post('/:id/backgrounds', createBackground);
router.get('/:id/backgrounds', getBackgroundsByProfessor);
router.get('/:id/backgrounds/:backgroundId', getBackgroundById);
router.put('/:id/backgrounds/:backgroundId', putBackground);
router.patch('/:id/backgrounds/:backgroundId', patchBackground);
router.delete('/:id/backgrounds/:backgroundId', deleteBackground);

module.exports = router;
