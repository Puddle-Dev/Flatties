const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

//get all users
router.get('/all', userController.getAllUsers);
