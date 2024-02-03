const mongoose = require('mongoose');

const ListingModel = new mongoose.Schema({
    propertyId: {type: mongoose.Schema.Types.ObjectId, ref: 'property', required: true},
    title: String,
    rent: Number,
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
    imagesUrl: [String],
    nearbyFacilities: [String],
    description: String,
},{
    timestamps: true,
});

module.exports = mongoose.model('listing', ListingModel);