const mongoose = require('mongoose');

const PropertyModel = new mongoose.Schema({
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    type: {type: String, required: true},
    bedrooms: {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    title: {type: String, required: true},
    rent: {type: Number, required: true},
    rentMethod: String,
    rentPaymentPeriod: String,
    deposit: Number,
    availabilityDate: Date,
    leaseTerm: String,
    isFurnished: Boolean,
    isPetAllowed: Boolean,
    isSmokingAllowed: Boolean,
    isParkingAllowed:Boolean,
    year_built: Date,
    description: String,
    nearbyFacilities: [String],
    imagesUrl: [String],
},{
    timestamps: true,
});

module.exports = mongoose.model('Property', PropertyModel);