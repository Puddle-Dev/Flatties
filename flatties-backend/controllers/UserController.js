const userModel = require('../models/Users');

const UserController = {
    //create a new user
    createUser: async (req, res) => {
        try {
            const user = await userModel.create(req.body);
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get all users
    getAllUsers: async (req, res) => {
        try {
            const user = await userModel.find({});
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get user by email
    getUserByEmail: async (req, res) => {
        try {
            const user = await userModel.find({email: req.params.email});
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
     //get user by id
     getUserByID: async (req, res) => {
        try {
            const user = await userModel.find({id: req.params.id});
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //update a user by id
    updateUserById: async (req, res) => {
        try {
            const user = await userModel.updateOne(
                {_id: req.params.id},
                {$set: req.body}
            );
            if(!property){
                return res.status(404).json({message: "User not found"});
            }
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //delete a user by id
    deleteUserById: async (req, res) => {
        try {
            const user = await userModel.deleteOne({_id: req.params.id});
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
};

module.exports = UserController;