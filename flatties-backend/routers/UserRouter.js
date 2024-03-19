const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { verifyToken, checkPermission } = require('../server/auth');

const admin = "admin";  //user

//get all users
router.get('/all', verifyToken, checkPermission([admin]), userController.getAllUser);

//get user by id
router.get('/find', verifyToken, checkPermission([admin]), userController.getUserByID);  //only admin can get user by ID

//get user profile
router.get('/profile', verifyToken, userController.getUserProfile);   //all users can get their own information

//get user watching list
router.get('/watchinglist',verifyToken, userController.getUserWatchingList);

//login
router.post('/login', userController.login);

//create a new user
router.post('/create', userController.createUser); 

//add a property to a watching list
router.post('/watchproperty', verifyToken, userController.addPropertyToWatchingList);

//update user's profile
router.patch('/update', verifyToken, userController.updateUser);    //all user can update their own information

//active user by id
router.patch('/active', verifyToken, checkPermission([admin]), userController.switchActiveStatu);

// update user account type
router.patch('/accounttype', verifyToken, checkPermission([admin]), userController.updateAccountType);  //only admin can update account type

//remove a property from a watching list
router.delete('/delete', verifyToken, checkPermission([admin]), userController.deleteUser); 


module.exports = router;


