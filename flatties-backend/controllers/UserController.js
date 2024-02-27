const UserModel = require('../models/UserModel');

const UserController = {
    //get all users
    getAllUser: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.status(200).json({users});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //get user by id
    getUserById: async (req, res) => {
        try {
            const user = await UserModel.findOne({_id: req.params._id});
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            res.status(200).json({user});
        } catch (error) {
            console.log(error);
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

    //update user by id
    updateUserById: async (req, res) => {
        try {
            const user = await UserModel
                .findByIdAndUpdate({_id: req.params._id},
                    req.body,
                    {new: true});
            if (!user) {
                return res.status(404).json({message: "User not found"});

            }
            res.status(200).json({success: true, user});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },

    //delete user by id
    deleteUserById: async (req, res) => {
        try {
            const user = await UserModel.findOneAndDelete({_id: req.params._id});
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            res.status(200).json({success: true, user});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },

    //active user by id
    activateUserById: async (req, res) => {
        try {
            const user = await UserModel
                .findByIdAndUpdate({_id: req.params._id},
                    {isActive: true},
                    {new: true});
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            res.status(200).json({success: true, user});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //inactive user by id
    inactiveUserById: async (req, res) => {
        try {
            const user = await UserModel
                .findByIdAndUpdate({_id: req.params._id},
                    {isActive: false},
                    {new: true});
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            res.status(200).json({success: true, user});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //login
    login : async (req, res) => {
        console.log("login api called");
        console.log(req.body);
        try {
            const user = await UserModel.findOne({email: req.body.email});

            if (!user) {
                return res.status(404).json({message: "User not found"});
            }

            if (req.body.password !== user.password) {
                console.log("Password is incorrect");
                return res.status(400).json({message: "Password is incorrect"});
            }

            res.status(200).json({message: "Login successful", userId: user._id});
            console.log("Login successful");

        } catch (error) {
            console.log(error + " at login controller");
            res.status(500).json({message: "Server Error"});
        }
    }

}

module.exports = UserController;