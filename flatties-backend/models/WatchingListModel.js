const mongoose = require('mongoose');

const WatchingListSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    propertyId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true}],
    createdAt: {type: Date, default: Date.now, required: true},
    updatedAt: {type: Date, default: Date.now, required: true},
},{
    timestamps: true,
});

module.exports = mongoose.model('WatchingList', WatchingListSchema);