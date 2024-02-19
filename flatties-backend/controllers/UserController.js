const userModels = require('../models/UserModel');
const watchingListModel = require('../models/WatchingListModel');
const propertyModel = require('../models/PropertyModel');

const userController = {
    //login
    login : async (req, res) => {
        console.log("login api called");
        console.log(req.body);
        try {
            const user = await userModels.findOne({email: req.body.email});

            if(!user){
                return res.status(404).json({message: "User not found"});
            }

            if(req.body.password !== user.password){
                console.log("Password is incorrect");
                return res.status(400).json({message: "Password is incorrect"});
            }

            res.status(200).json({message: "Login successful"});
            console.log("Login successful");

        } catch (error) {
            console.log(error + " at login controller");
            res.status(500).json({message: "Server Error"});
        }
    },

    //create a new user
    createUser : async (req, res) => {
        console.log("createUser api called");
        console.log(req.body);
        try {
            const user = await userModels.create(req.body);
            //create a new watching list for the user
            const watchingList = await watchingListModel.create({userId: user._id});
            user.watchingList = watchingList._id;
            const userWithWatchingList = await user.save();
            res.json({user: userWithWatchingList, watchingList});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get all user
    getAllUser : async (req, res) => {
        try {
            //get all users
            const users = await userModels.find({});
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get user by id
    getUserById : async (req, res) => {
        console.log("getUserById api called with id:");
        console.log(req.params);
        try {
            const user = await userModels.findOne(req.params);
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            const watchingList = await watchingListModel.findOne({userId: user._id});
            res.json({user: user, watchingList: watchingList});
            console.log(user);
            console.log("User data sent to client");
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //update user by id
    updateUserById : async (req, res) => {
        try {
            // Find and update the user in one step
            const updatedUser = await userModels.findOneAndUpdate(
                { _id: req.params._id, isActive: true }, // Ensure user is active
                { $set: req.body },
                { new: true, useFindAndModify: false } // Return the updated document
            );

            console.log(updatedUser)

            // Check if the user was found and updated
            if (updatedUser) {
                res.status(200).json({ message: "User updated successfully" });
            } else {
                res.status(400).json({ message: "User not found or not active" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //delete user by id
    //***Note: This action will delete the user from the database***//
    deleteUserById : async (req, res) => {
        try {
            const user = await userModels.deleteOne({_id: req.params._id});
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //deactivate user by id
    inactiveUserById : async (req, res) => {
        try {
            const user = await userModels.updateOne(
                {_id: req.params._id},
                {$set: {isActive: false}}
            );
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //activate user by id
    activateUserById : async (req, res) => {
        try {
            const user = await userModels.updateOne(
                {_id: req.params._id},
                {$set: {isActive: true}}
            );
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get users by phone, email or username
    //this function may need to break down into three separate functions
    getUserBySearch : async (req, res) => {
        try {
            const user = await userModels.find({
                $or: [
                    {email: req.params.email},
                    {phone: req.params.phone},
                    {userName: req.params.userName}
                ]
            });
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get all the properties that a user owns
    getUserProperties : async (req, res) => {
        try {
            const user = await userModels.findOne({_id: req.params._id});
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            const properties = await propertyModel.find({ownerId: user._id});
            res.json(properties);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
};

module.exports = userController;