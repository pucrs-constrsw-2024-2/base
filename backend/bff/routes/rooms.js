const express = require('express');
const {
  createRoom,
  getAllRooms,
  getRoomById,
  fullRoomUpdate,
  partialRoomUpdate,
  deleteRoomById,
  createFeature,
  getAllFeatures,
  getFeatureById,
  fullFeatureUpdate,
  partialFeatureUpdate,
  deleteFeatureById,
  getHealth
} = require("../controllers/roomsController");

const router = express.Router();

router.get('/health', getHealth);
router.post('/', createRoom);
router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.put('/:id', fullRoomUpdate);
router.patch('/:id', partialRoomUpdate);
router.delete('/:id', deleteRoomById);
router.post("/:id/features", createFeature);
router.get("/:id/features", getAllFeatures);
router.get("/:id/features/:featureId", getFeatureById);
router.put("/:id/features/:featureId", fullFeatureUpdate);
router.patch("/:id/features/:featureId", partialFeatureUpdate);
router.delete("/:id/features/:featureId", deleteFeatureById);

module.exports = router;
