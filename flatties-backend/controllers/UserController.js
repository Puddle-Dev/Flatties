const userModels = require('../models/UserModel');
const watchingListModel = require('../models/WatchingListModel');

const userController = {
    //create a new user
    createUser : async (req, res) => {
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
            const users = await userModels.find({});
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get user by id
    getUserById : async (req, res) => {
        try {
            const user = await userModels.findOne(req.body._id);
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            res.json(user);
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
    }
};

module.exports = userController;