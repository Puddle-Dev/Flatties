const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

//create a new user
router.post('/create', UserController.createUser);
//get all users
router.get('/all', UserController.getAllUsers);
//get user by id
router.get('/id/:id', UserController.getUserByID);
//get user by email
router.get('/email/:email', UserController.getUserByEmail);
//update a user by id
router.put('/update/:id', UserController.updateUserById);
//delete a property by id
router.delete('/delete/:id', UserController.deleteUserById);

module.exports = router;