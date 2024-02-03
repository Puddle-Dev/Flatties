const mongoose = require('mongoose');

const WatchingListModel = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    listings: [{
        propertyId: {type: mongoose.Schema.Types.ObjectId, ref: 'property', required: true},
        status: String, // status: 'watching', 'interested', 'not-interested'
        appointmentDate: Date,
    }],
},{
    timestamps: true,
});

module.exports = mongoose.model('watchinglist', WatchingListModel);