const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  cuisine: {
    type: [String],
    required: true
  },
  openingHours: {
    type: Map,
    of: String,
    required: true
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
  // Other restaurant attributes as per your requirements
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
