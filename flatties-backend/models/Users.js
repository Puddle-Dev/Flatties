/**
 * database schema for users
**/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    user_id:{type:String, required:true},
    user_first_name:{type:String, required:true},
    user_last_name:{type:String, required:true},
    user_email:{type:String, required:true},
    user_phone:{type:String, required:true},
    user_password:{type:String, required:true},
    user_gender:{type:String, required:true},
    user_dob:{type:Date, required:false},
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;