const express = require('express');
const commentController = require('../controllers/comment/commentController');
const auth = require('../middleware/auth');

const router = express.Router();

// comment registration
router.post('/create', commentController.CreateComment);

// Delete comment
router.delete('/delete', auth, commentController.deleteComment);

// Update comment information
router.put('/update', auth, commentController.updateCommentInfo);

router.get('/:id', auth, commentController.getCommentById)

router.get('/all', auth, commentController.getAllComments)

module.exports = router;
