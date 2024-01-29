/**
 * database schema for users
**/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    password:{type:String, required:true},
    gender:{type:String, required:true},
    dob:{type:Date, required:false},
    isActive:{type:Boolean, default:true},
    watchingList: { type: mongoose.Schema.Types.ObjectId, ref: 'WatchingList' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},{
    timestamps:true,
}
);

const Users = mongoose.model('User', userSchema);
module.exports = Users;