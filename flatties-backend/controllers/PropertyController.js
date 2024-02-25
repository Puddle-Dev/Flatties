
const PropertyModel = require('../models/PropertyModel');
const UserModel = require('../models/UserModel');
const Mongoose = require('mongoose');

const PropertyController = {
    //create a new property
    createProperty: async (req, res) => {
        try {
            console.log("createProperty API called with request body: ", req.body);
            //check the ownerId is valid
            if(!Mongoose.Types.ObjectId.isValid(req.body.ownerId)){
                console.log("Owner ID is not valid");
                return res.status(400).json({message: "Owner ID is not valid"});
            }
            //check the ownerId is exist
            if(!await UserModel.findOne({_id: req.body.ownerId})){
                console.log("Owner ID is not exist");
                return res.status(400).json({message: "Owner ID is not exist"});
            }
            //create a new property
            const property = await PropertyModel.create(req.body);
            res.status(201).json(property);
            console.log(property);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get all properties
    getAllProperties: async (req, res) => {
        try {
            const properties = await PropertyModel.find({});
            res.json(properties);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get properties by city
    getPropertiesByCity: async (req, res) => {
        try {
            const properties = await PropertyModel.find({city: req.params.city});
            res.json(properties);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //update a property by id
    updatePropertyById: async (req, res) => {
        try {
            const property = await PropertyModel.updateOne(
                {_id: req.params.id},
                {$set: req.body}
            );
            if(!property){
                return res.status(404).json({message: "Property not found"});
            }
            res.json(property);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //active a property by id
    activePropertyById: async (req, res) => {
        try {
            const property = await PropertyModel.updateOne(
                {_id: req.params.id},
                {$set: {isActive: true}}
            );
            if(!property){
                return res.status(404).json({message: "Property not found"});
            }
            res.json(property);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //inActive a property by id
    inactivePropertyById: async (req, res) => {
        try {
            const property = await PropertyModel.updateOne(
                {_id: req.params.id},
                {$set: {isActive: false}}
            );
            if(!property){
                return res.status(404).json({message: "Property not found"});
            }
            res.json(property);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },

    //delete a property by id
    deletePropertyById: async (req, res) => {
        try {
            const property = await PropertyModel.deleteOne({_id: req.params.id});
            if(!property){
                return res.status(404).json({message: "Property not found"});
            }
            res.json(property);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
};

module.exports = PropertyController;