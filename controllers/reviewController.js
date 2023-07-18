const Review = require('../models/Review');
const Item = require('../models/Item');
const natural = require('natural');
const { TfidfVectorizer } = require('scikit-learn');
const { KMeans } = require('scikit-learn');

// Controller for creating a new review
exports.createReview = async (req, res) => {
  try {
    const { userId, restaurantId, rating, comment } = req.body;
    const review = await Review.create({ user: userId, restaurant: restaurantId, rating, comment });

    // Call the function to identify items mentioned in the review
    const itemsMentioned = await identifyItemsMentioned(comment);

    // Update the item records with the review details
    await updateItemsWithReview(itemsMentioned, review._id);

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// Function to identify items mentioned in the review
const identifyItemsMentioned = async (comment) => {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(comment);

  // Fetch all items from the database
  const items = await Item.find();
  const itemNames = items.map((item) => item.name.toLowerCase());

  // Convert item names to documents for the TF-IDF vectorizer
  const documents = itemNames.map((name) => [name]);

  // Create the TF-IDF vectorizer
  const vectorizer = new TfidfVectorizer();
  const X = vectorizer.fitTransform(documents);

  // Vectorize the review comment
  const reviewVector = vectorizer.transform([words.join(' ')]);

  // Use K-Means clustering to find the most similar items
  const kmeans = new KMeans();
  kmeans.fit(X);

  // Predict the cluster for the review vector
  const predictedCluster = kmeans.predict(reviewVector)[0];

  // Get the item names belonging to the predicted cluster
  const predictedItems = items.filter((item, index) => kmeans.labels_[index] === predictedCluster);

  return predictedItems.map((item) => item._id);
};

// Function to update the item records with the review details
const updateItemsWithReview = async (itemsMentioned, reviewId) => {
  for (const itemId of itemsMentioned) {
    // Update the item record with the review ID
    await Item.findByIdAndUpdate(itemId, { $push: { reviews: reviewId } });
  }
};

// Controller for retrieving a review
exports.getReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve review' });
  }
};

// Controller for updating a review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
};

// Controller for deleting a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

// Controller for retrieving reviews by user
exports.getReviewsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ user: userId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
};

// Controller for retrieving reviews by restaurant
exports.getReviewsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const reviews = await Review.find({ restaurant: restaurantId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
};

// Other review-related controllers
// ...
