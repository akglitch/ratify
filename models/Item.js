const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  description: String,
  photos: [String],
  averageRating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
  // Other item attributes as per your requirements
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
