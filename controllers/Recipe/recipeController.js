//controllers to get , create, update, and delete recipe

const RecipeModel = require('../../models/recipe')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create a new recipe
exports.Createrecipe = async (req, res) => {
  const { Title , instruction, ingredents,preparation } = req.body;
  try {
    
    // Create a new recipe
    const recipe = new recipe({ Title , instruction, ingredents,preparation });

    const newrecipe = await RecipeModel.create(recipe);
    

    
    res.status(201).json({ message: 'recipe createed successfully' });
  } catch (error) {
    console.log('Error createing recipe:', error);
    res.status(500).json({ message: 'Error createing recipe', details: error.message });
  }
};


// Delete a recipe
exports.deleterecipe = async (req, res) => {
  try {
    const recipeId = req.recipe.recipeId;

    // Check if recipe exists
    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'recipe not found' });
    }

    // Delete the recipe

    if (req.User._id != recipe.Author){
        return res.status(401).json({ message: 'You can not delete this recipe' });
    }
    await recipe.remove();
    res.status(200).json({ message: 'recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Error deleting recipe', details: error.message });
  }
};

// Update recipe information
exports.updaterecipeInfo = async (req, res) => {
  try {
    const recipeId = req.recipe.recipeId;
    const { Title , instruction, ingredents,preparation } = req.body;

    // Check if recipe exists
    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'recipe not found' });
    }
    if (req.User._id != recipe.Author){
        return res.status(401).json({ message: 'You can not edit this recipe' });
    }
    // Update recipe information
    recipe.Titele = Title || recipe.Titele;
    recipe.Ingridents = ingredents || recipe.Ingridents;
    recipe.Preparetion = preparation || recipe.Preparetion;
    recipe.Instraction = instruction || recipe.Instraction;
    

    await recipe.save();
    res.status(200).json({ message: 'recipe information updated successfully' });
  } catch (error) {
    console.error('Error updating recipe information:', error);
    res.status(500).json({ message: 'Error updating recipe information', details: error.message });
  }
};


//get recipe by id


exports.getrecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const recipe = await RecipeModel.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    res.status(500).json({ message: 'Failed to fetch recipe' });
  }
}

//get all recipe

exports.getAllrecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.find();
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching all recipe:', error);
    res.status(500).json({ message: 'Failed to fetch recipe' });
  }
}