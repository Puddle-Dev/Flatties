const Users = require('../models/users');

//get users
const getUsers = (req, res) => {
    Users.find({}, (err, users) => {
        if(err){
            console.log(err);
        }else{
            res.send(users);
        }
    });
};

//get user by id
const getUserById = (req, res) => {
    Users.findById(req.params.id, (err, user) => {
        if(err){
            console.log(err);
        }else{
            res.send(user);
        }
    });
};

//add user
const addUser = (req, res) => {
    Users.create(req.body, (err, user) => {
        if(err){
            console.log(err);
        }else{
            res.send(user);
        }
    });
};

//update user
const updateUser = (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if(err){
            console.log(err);
        }else{
            res.send(user);
        }
    });
};

//delete user
const deleteUser = (req, res) => {
    Users.findByIdAndDelete(req.params.id, (err, user) => {
        if(err){
            console.log(err);
        }else{
            res.send(user);
        }
    });
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};