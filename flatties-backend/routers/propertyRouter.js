const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

//create a new property
router.post('/create', propertyController.createProperty);
//get all properties
router.get('/all', propertyController.getAllProperties);
//get properties by city
router.get('/city/:city', propertyController.getPropertiesByCity);
//update a property by id
router.put('/update/:id', propertyController.updatePropertyById);
//delete a property by id
router.delete('/delete/:id', propertyController.deletePropertyById);

module.exports = router;