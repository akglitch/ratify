const Item = require('../models/Item');

// Controller for creating a new item
exports.createItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const item = await Item.create({ name, description, price });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
};

// Controller for retrieving item details
exports.getItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve item' });
  }
};

// Controller for updating item details
exports.updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, description, price } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { name, description, price },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

// Controller for deleting an item
exports.deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
}
};