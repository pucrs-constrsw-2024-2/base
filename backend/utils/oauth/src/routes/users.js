// backend/api/routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');

router.get('/health', usersController.health);
router.post('/login', usersController.login);
router.post('/users', usersController.createUser);
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', usersController.updateUser);
router.patch('/users/:id', usersController.updateUserPassword);
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;