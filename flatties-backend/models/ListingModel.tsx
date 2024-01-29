const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    // propertyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true},
    title: String,
    description: String,
    rent: Number,
    rentPaymentPeriod: String,
    deposit: Number,
    availabilityDate: Date,
    leaseTerm: String,
    propertyPhotos: String,
    petAllowed: Boolean,
    smokingAllowed: Boolean,
    parkingAllowed:Boolean,
    parking: String,
    image: String,
    year_built: Date,
    createdAt: {type: Date, default: Date.now, required: true},
    updatedAt: {type: Date, default: Date.now, required: true},
},{
    timestamps: true,
});

propertySchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

propertySchema.pre('updateOne', function(next){
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Properties', propertySchema);