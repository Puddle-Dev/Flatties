const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    property_title:String,
    property_description:String,
    property_address:String,
    property_city:String,
    property_state:String,
    property_zip:String,
    property_price:String,
    property_type:String,
    property_year_built:Date,
    property_parking:String,
    property_image:String,
    property_date:Date,
});

module.exports = mongoose.model('Properties', propertySchema);