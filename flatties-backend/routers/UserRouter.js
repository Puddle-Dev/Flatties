const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const watchingListController = require('../controllers/WatchingListController');

//get all users
router.get('/all', userController.getAllUser); //test passed

//get user by id
router.get('/:_id', userController.getUserById); //test passed

//get user by search
router.get('/search', userController.getUserBySearch);  //test not passed yet

//get all properties in a watching list
router.get('/:_id/watchingList', watchingListController.getUserWatchingList);

//get all properties that a user owns
router.get('/:_id/properties', userController.getUserProperties);

//update user by id
router.put('/update/:_id', userController.updateUserById);  //test passed

//active user by id
router.put('/active/:_id', userController.activateUserById);    //test passed

//inactive user by id
router.put('/inactive/:_id', userController.inactiveUserById);  //test passed

//update a property in a watching list
router.put('/:_id/updateProperty', watchingListController.updateWatchingProperty);

//login
router.post('/login', userController.login);   //test passed

//create a new user
router.post('/create', userController.createUser);  //test passed

//add a property to a watching list
router.post('/:_id/addProperty/:propertyId', watchingListController.addPropertyToWatchingList);

//remove a property from a watching list
router.delete('/:_id/removeProperty/:propertyId', watchingListController.removePropertyFromWatchingList);


/**
 * -----------------------
 * Developer use only API
 * -----------------------
 */
//create a new watching list
router.post('/createWatchingList', watchingListController.createWatchingList);

//delete a watching list by id
router.delete('/deleteWatchingList/:id', watchingListController.deleteWatchingListById);

//delete user by id
router.delete('/delete/:_id', userController.deleteUserById);

module.exports = router;


