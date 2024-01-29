const express = require('express');
const router = express.Router();
const listingController = require('../controllers/ListingController');

//get all listings
router.get('/all', listingController.getAllListings);

//get listings by city
router.get('/city/:city', listingController.getListingsByCity);

//get listing by id
router.get('/:id', listingController.getListingById);

//create a new listing
router.post('/create', listingController.createListing);

//update a listing by id
router.put('/update/:id', listingController.updateListingById);

//delete a listing by id
router.delete('/delete/:id', listingController.deleteListingById);

module.exports = router;