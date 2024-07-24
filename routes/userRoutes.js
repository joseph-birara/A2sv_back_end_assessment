const express = require('express');
const userController = require('../controllers/user/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// User registration
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// Delete user
router.delete('/delete', auth, userController.deleteUser);

// Update user information
router.put('/update', auth, userController.updateUserInfo);

router.get('/:id', auth, userController.getUserById)

router.get('/all', auth, userController.getAllUsers)

module.exports = router;
