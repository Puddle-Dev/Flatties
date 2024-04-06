
const PropertyModel = require('../models/PropertyModel');

const PropertyController = {
    //create a new property
    createProperty: async (req, res) => {
        try {
            const property = await PropertyModel.create(req.body);
            res.json(property);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get all properties
    getAllProperties: async (req, res) => {
        try {
            const properties = await PropertyModel.find({});
            if(properties.length == 0){
                console.log("Database is currently empty!")
                return res.status(500).json({message: "databse is currently empty!"})
            }
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
        console.log("updatePropertyById", req.body);
        try {
            const property = await PropertyModel.updateOne(
                {_id: req.body._id},
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
        const adminId = req.decodedToken._id;
        const propertyId = req.body.propertyId; //get the userId from the request body
        console.log('deleteUser called with userID:', adminId);
        try {
            const property = await PropertyModel.findOneAndDelete({_id: propertyId});
            if(!property){
                console.log("Property not found: " + propertyId)
                return res.status(404).json({message: "Property not found"});
            }
            console.log("property: " + propertyId + " has been deleted by admin: " + adminId)
            res.json({message: "property: " + propertyId + " has been deleted by admin: " + adminId});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
};

module.exports = PropertyController;