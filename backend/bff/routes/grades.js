const express = require('express');
const { getAvaliacoesByClasseId, getAvaliacaoByClasseIdAndAvaliacaoId, createAvaliacao, updateAvaliacaoByClasseIdAndAvaliacaoId, partialUpdateAvaliacaoByClasseIdAndAvaliacaoId, deleteAvaliacaoByClasseIdAndAvaliacaoId } = require('../controllers/gradesController');
const router = express.Router();

router.get('/:idClasse/classe', getAvaliacoesByClasseId);
router.get('/:idClasse/classe/:idAvaliacao', getAvaliacaoByClasseIdAndAvaliacaoId);
router.post('/:idClasse/classe', createAvaliacao);
router.put('/:idClasse/classe/:idAvaliacao', updateAvaliacaoByClasseIdAndAvaliacaoId);
router.patch('/:idClasse/classe/:idAvaliacao', partialUpdateAvaliacaoByClasseIdAndAvaliacaoId);
router.delete('/:idClasse/classe/:idAvaliacao', deleteAvaliacaoByClasseIdAndAvaliacaoId);

module.exports = router;