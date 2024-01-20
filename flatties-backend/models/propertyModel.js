const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: String,
    description: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    price: String,
    type: String,
    parking: String,
    image: String,
    year_built: Date,
    createdAt: {type: Date, default: Date.now, required: true},
    updatedAt: {type: Date, default: Date.now, required: true},
},{
    timestamps: true,
}
);

module.exports = mongoose.model('Properties', propertySchema);