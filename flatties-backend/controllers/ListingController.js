const ListingModel = require('../models/ListingModel');

const ListingController = {
    //get all listings
    getAllListings: async (req, res)=>{
        try {
            const listings = await ListingModel.find({});
            res.json(listings);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get listings by city
    getListingsByCity: async(req, res)=>{
        try {
            const listings = await ListingModel.find({city: req.params.city});
            res.json(listings);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get listing by id
    getListingById: async(req, res)=>{
        try {
            const listing = await ListingModel.findById(req.params.id);
            if(!listing){
                return res.status(404).json({message: "Listing not found"});
            }
            res.json(listing);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //create a new listing
    createListing: async(req, res)=>{
        try {
            const listing = await ListingModel.create(req.body);
            res.json(listing);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //update a listing by id
    updateListingById: async(req, res)=>{
        try {
            const listing = await ListingModel.updateOne(
                {_id: req.params.id},
                {$set: req.body}
            );
            if(!listing){
                return res.status(404).json({message: "Listing not found"});
            }
            res.json(listing);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //delete a listing by id
    deleteListingById: async(req, res)=>{
        try {
            const listing = await ListingModel.deleteOne({_id: req.params.id});
            if(!listing){
                return res.status(404).json({message: "Listing not found"});
            }
            res.json(listing);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },

};

module.exports = ListingController;