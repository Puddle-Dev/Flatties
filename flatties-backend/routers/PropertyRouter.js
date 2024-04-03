const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/PropertyController');

//get all properties
router.get('/all', propertyController.getAllProperties);    //test passed

//get properties by city
router.get('/city/:city', propertyController.getPropertiesByCity);  //test passed

//update a property by id
router.patch('/update', propertyController.updatePropertyById); //test passed, and used in the frontend -wiiliam

//active a property by id
router.put('/active/:id', propertyController.activePropertyById);

//inactive a property by id
router.put('/inactive/:id', propertyController.inactivePropertyById);

//create a new property
router.post('/create', propertyController.createProperty);


/**
 * -----------------------
 * Developer use only API
 * -----------------------
 */
//delete a property by id
router.delete('/delete/:id', propertyController.deletePropertyById);

module.exports = router;