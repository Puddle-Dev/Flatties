const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const watchingListController = require('../controllers/WatchingListController');
const { verifyToken, checkPermission } = require('../server/auth');

const admin = "admin";

//get all users
router.get('/all', verifyToken, checkPermission([admin]), userController.getAllUser);

//get user by id
router.get('/find', verifyToken, checkPermission([admin]), userController.getUserByID);  //only admin can get user by ID

//get user profile
router.get('/profile', verifyToken, userController.getUserProfile);   //all users can get their own information


//get all properties in a watching list
// router.get('/:_id/watchingList', watchingListController.getUserWatchingList);

//login
router.post('/login', userController.login);

//create a new user
router.post('/create', userController.createUser); 

//add a property to a watching list
// router.post('/:_id/addProperty/:propertyId', watchingListController.addPropertyToWatchingList);

//update user's profile
router.patch('/update', verifyToken, userController.updateUser);    //all user can update their own information

//active user by id
// router.put('/active/:_id', userController.activateUserById);  

//inactive user by id
// router.put('/inactive/:_id', userController.inactiveUserById);

//update a property in a watching list
// router.put('/:_id/updateProperty', watchingListController.updateWatchingProperty);

//remove a property from a watching list
router.delete('/delete', verifyToken, checkPermission([admin]), userController.deleteUser); 


module.exports = router;


