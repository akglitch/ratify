const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config(); // Load environment variables from .env file
const PORT = 8000

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });

// Import and mount the routes
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const itemRoutes = require('./routes/itemRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Middleware configuration
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(
  express.urlencoded({extended : true})
);

// Mount the routes
app.use('/api', userRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', itemRoutes);
app.use('/api', reviewRoutes);

// Other app configurations
// ...

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
