const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/PropertyController');
const { verifyToken, checkPermission } = require('../server/auth');

const admin = "admin";

//get all properties
router.get('/all', propertyController.getAllProperties);    //test passed

//get properties by city
router.get('/city/:city', propertyController.getPropertiesByCity);  //test passed

//update a property by id
router.patch('/update', verifyToken, propertyController.updatePropertyById); //test passed, and used in the frontend -wiiliam

//active a property by id
router.put('/active/:id', propertyController.activePropertyById);

//inactive a property by id
router.put('/inactive/:id', propertyController.inactivePropertyById);

//create a new property
router.post('/create', verifyToken, propertyController.createProperty);

/**
 * -----------------------
 * Developer use only API
 * -----------------------
 */
//delete a property by id
router.delete('/delete',verifyToken, checkPermission([admin]), propertyController.deletePropertyById);    //test passed

module.exports = router;