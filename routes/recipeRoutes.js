const express = require('express');
const recipeController = require('../controllers/Recipe/recipeController');
const auth = require('../middleware/auth');

const router = express.Router();

// recipe registration
router.post('/create', recipeController.Createrecipe);

// Delete recipe
router.delete('/delete', auth, recipeController.deleterecipe);

// Update recipe information
router.put('/update', auth, recipeController.updaterecipeInfo);

router.get('/:id', auth, recipeController.getrecipeById)

router.get('/all', auth, recipeController.getAllrecipe)

module.exports = router;
