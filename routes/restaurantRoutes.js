const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Restaurant routes
router.post('/restaurants', restaurantController.createRestaurant);
router.get('/restaurants/:restaurantId', restaurantController.getRestaurant);
router.put('/restaurants/:restaurantId', restaurantController.updateRestaurant);
router.delete('/restaurants/:restaurantId', restaurantController.deleteRestaurant);

module.exports = router;
