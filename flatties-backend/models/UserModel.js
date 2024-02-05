/**
 * database schema for users
**/

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    imageUrl:String,
    userName:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    password:{type:String, required:true},
    gender:{type:String, required:true},
    dob:{type:String, required:true},
    isATenant:{type:Boolean, default:false},
    isALandLord:{type:Boolean, default:false},
    isActive:{type:Boolean, default:true},
    watchingList: { type: mongoose.Schema.Types.ObjectId, ref: 'watchinglist',default: null },
},{
    timestamps:true,
});

module.exports = mongoose.model('user', userSchema);