const propertyModel = require('../models/PropertyModel');

const PropertyController = {
    //create a new property
    createProperty: async (req, res) => {
        try {
            const property = await propertyModel.create(req.body);
            res.json(property);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get all properties
    getAllProperties: async (req, res) => {
        try {
            const properties = await propertyModel.find({});
            res.json(properties);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get properties by city
    getPropertiesByCity: async (req, res) => {
        try {
            const properties = await propertyModel.find({city: req.params.city});
            res.json(properties);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //update a property by id
    updatePropertyById: async (req, res) => {
        try {
            const property = await propertyModel.updateOne(
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
    //delete a property by id
    deletePropertyById: async (req, res) => {
        try {
            const property = await propertyModel.deleteOne({_id: req.params.id});
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