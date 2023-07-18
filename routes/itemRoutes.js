const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Item routes
router.route('/items')
  .get(itemController.getItem)
  .post(itemController.createItem);

router.route('/items/:itemId')
  .get(itemController.getItem)
  .put(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;


