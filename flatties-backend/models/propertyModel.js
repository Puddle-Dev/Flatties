const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    // ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    description: String,
    address: String,
    city: String,
    zip: String,
    price: Number,
    propertyType: String,
    bedRooms: Number,
    bathRooms: Number,
    image: String,
    year_built: Date,
    createdAt: {type: Date, default: Date.now, required: true},
    updatedAt: {type: Date, default: Date.now, required: true},
},{
    timestamps: true,
});

PropertySchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

PropertySchema.pre('updateOne', function(next){
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Property', PropertySchema);