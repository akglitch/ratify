const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Review routes
router.post('/reviews', reviewController.createReview);
router.get('/reviews/:reviewId', reviewController.getReview);
router.put('/reviews/:reviewId', reviewController.updateReview);
router.delete('/reviews/:reviewId', reviewController.deleteReview);
router.get('/users/:userId/reviews', reviewController.getReviewsByUser);
router.get('/restaurants/:restaurantId/reviews', reviewController.getReviewsByRestaurant);

module.exports = router;
