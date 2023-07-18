const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/users', userController.createUser);
router.post('/users/login', userController.loginUser);
router.get('/users/:userId', userController.getUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
