const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');

const CommentRoutes = require('./routes/commentRoutes')

const RecipeRouets = require('./routes/recipeRoutes')


dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

  app.use('/api/user', userRoutes);
  app.use('/api/comment', CommentRoutes);
  app.use('/api/recipe')
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
