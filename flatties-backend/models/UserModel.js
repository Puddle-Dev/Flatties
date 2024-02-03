/**
 * database schema for users
**/

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    imageUrl:String,
    userName:{type:String, required:true},
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    password:{type:String, required:true},
    gender:{type:String, required:true},
    dob:{type:Date, required:true},
    isATenant:{type:Boolean, default:false},
    isALandLord:{type:Boolean, default:false},
    isActive:{type:Boolean, default:true},
    watchingList: { type: mongoose.Schema.Types.ObjectId, ref: 'watchinglist' },
},{
    timestamps:true,
});

module.exports = mongoose.model('user', userSchema);