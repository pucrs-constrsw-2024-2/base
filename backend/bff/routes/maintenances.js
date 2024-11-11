const express = require('express');
const { createMaintenance, getAllMaintenances, getMaintenanceById, updateMaintenance, partialMaintenanceUpdate, deleteMaintenance } = require('../controllers/maintenancesController');
const router = express.Router();

router.post('/:resourceId/maintenance', createMaintenance);
router.get('/:resourceId/maintenance', getAllMaintenances);
router.get('/:resourceId/maintenance/:id', getMaintenanceById);
router.put('/:resourceId/maintenance/:id', updateMaintenance);
router.patch('/:resourceId/maintenance/:id', partialMaintenanceUpdate);
router.delete('/:resourceId/maintenance/:id', deleteMaintenance);

module.exports = router;
