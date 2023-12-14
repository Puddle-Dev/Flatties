const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//get users
router.get('/users', userController.getUsers);

//get user by id
router.get('/users/:id', userController.getUserById);

//add user
router.post('/users', userController.addUser);

//update user
router.put('/users/:id', userController.updateUser);

//delete user
router.delete('/users/:id', userController.deleteUser);