const express = require('express');
const { getAllUsers, registerController, loginController } = require('../Controllers/userController');

// router object
const router = express.Router();


// find all users
router.get('/all-users', getAllUsers);

// registration
router.post('/register', registerController);

// login
router.post('/login', loginController);




module.exports = router;