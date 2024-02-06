const mongoose = require('mongoose');

const PropertyModel = new mongoose.Schema({
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    type: {type: String, required: true},
    bedrooms: Number,
    bathrooms: Number,
    imagesUrl: [String],
},{
    timestamps: true,
});

module.exports = mongoose.model('Property', PropertyModel);