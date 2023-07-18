const Restaurant = require('../models/Restaurant');

// Controller for creating a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const { name, location, cuisine } = req.body;
    const restaurant = await Restaurant.create({ name, location, cuisine });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create restaurant' });
  }
};

// Controller for retrieving restaurant details
exports.getRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve restaurant' });
  }
};

// Controller for updating restaurant details
exports.updateRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, location, cuisine } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { name, location, cuisine },
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
};

// Controller for deleting a restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!deletedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
};

// Other restaurant-related controllers
// ...
