//controllers to get , create, update, and delete comments

const Comment = require('../../models/comment')

const RecipeModel = require('../../models/recipe')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create a new Comment
exports.CreateComment = async (req, res) => {
  const { Content,  Date, Author,Recipe } = req.body;
  try {
    
    // Create a new Comment
    const comment = new Comment({ Content,  Date, Author,Recipe });

    const newComment = await Comment.create(comment);

    //push the Recipe to Recipe table
    const RecipeItem = await RecipeModel.findById(Recipe);
    if (!RecipeItem) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Add the Recipe to the project's Recipe list if it's not already added
    if (!RecipeItem.Comments.includes(Recipe)) {
        RecipeItem.Comments.push(newComment._id);
      await RecipeItem.save();
    }


    
    res.status(201).json({ message: 'Comment createed successfully' });
  } catch (error) {
    console.log('Error createing Comment:', error);
    res.status(500).json({ message: 'Error createing Comment', details: error.message });
  }
};


// Delete a Comment
exports.deleteComment = async (req, res) => {
  try {
    const CommentId = req.Comment.CommentId;

    // Check if Comment exists
    const comment = await Comment.findById(CommentId);
    if (!Comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Delete the Comment

    if (req.User._id != comment.Author){
        return res.status(401).json({ message: 'You can not delete this comment' });
    }
    await comment.remove();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting Comment:', error);
    res.status(500).json({ message: 'Error deleting Comment', details: error.message });
  }
};

// Update Comment information
exports.updateCommentInfo = async (req, res) => {
  try {
    const CommentId = req.Comment.CommentId;
    const { Content} = req.body;

    // Check if Comment exists
    const comment = await Comment.findById(CommentId);
    if (!Comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (req.User._id != comment.Author){
        return res.status(401).json({ message: 'You can not edit this comment' });
    }
    // Update Comment information
    if (Content) comment.content = Content;
    

    await Comment.save();
    res.status(200).json({ message: 'Comment information updated successfully' });
  } catch (error) {
    console.error('Error updating Comment information:', error);
    res.status(500).json({ message: 'Error updating Comment information', details: error.message });
  }
};


//get Comment by it


exports.getCommentById = async (req, res) => {
  try {
    const CommentId = req.params.id;

    const Comment = await Comment.findById(CommentId);

    if (!Comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(Comment);
  } catch (error) {
    console.error('Error fetching Comment by ID:', error);
    res.status(500).json({ message: 'Failed to fetch Comment' });
  }
}

//get all Comments

exports.getAllComments = async (req, res) => {
  try {
    const Comments = await Comment.find();
    res.json(Comments);
  } catch (error) {
    console.error('Error fetching all Comments:', error);
    res.status(500).json({ message: 'Failed to fetch Comments' });
  }
}