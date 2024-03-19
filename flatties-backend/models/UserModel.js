/**
 * database schema for users
**/

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    accountType:{type:String, required:true, default:'user'},  //user, admin
    imageUrl:String,
    userName:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    phone:{type:String, required:true},
    password:{type:String, required:true},
    gender:{type:String, required:true},
    dob:{type:String, required:true},
    isATenant:{type:Boolean, default:false},
    isALandLord:{type:Boolean, default:false},
    isActive:{type:Boolean, default:true},
    watchingList:[
        {
            propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'property' },
            dateAdded: { type: Date, required:true, default: Date.now },
            status: { type: String, default: 'active' },
            note: { type: String, default: '' }
        }
    ],
},{
    timestamps:true,
});

module.exports = mongoose.model('user', userSchema);