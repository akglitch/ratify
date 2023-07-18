const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 200
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // Other review attributes as per your requirements
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
