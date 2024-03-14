const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { createToken } = require('../server/auth');

//remove password from the user object
function removePassword(user) {
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

const UserController = {
    //get all users
    getAllUser: async (req, res) => {
        const adminId = req.decodedToken._id;
        console.log("getAllUser API is called by ID: ", adminId);
        try {
            const users = await UserModel.find();
            if (users.length === 0) {
                console.log("User Database is empty!");
                return res.status(404).json({ message: "User Database is empty!" });
            }
            const safeUsers = users.map(user => removePassword(user));  //remove password from each user
            console.log('All users returned successfully');
            console.log("------------------------------------------")
            res.status(200).send({ message: 'All users returned successfully', users: safeUsers });
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: 'Error getting users', error: error.message });
        }
    },
      //get user's profile
      getUserProfile: async (req, res) => {
        const userId = req.decodedToken._id;
        console.log('getUserByID called with userID:', userId);
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                console.log('User not found', userId);
                return res.status(404).send({ message: 'User not found'});
            }
            console.log('User returned successfully', user);
            console.log("------------------------------------------")
            res.status(200).send({ message: 'User returned successfully', user: removePassword(user)  });
        } catch (error) {
            res.status(500).send({ message: 'Error getting user', error: error.message });
        }
    },
    //get user by id
    getUserByID: async (req, res) => {
        const adminId = req.decodedToken._id;
        const userId = req.body.userId; //get the userId from the request body
        console.log('getUserByID called with userID:', adminId);
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                console.log('User not found', userId);
                return res.status(404).send({ message: 'User not found'});
            }
            console.log('User returned successfully', user);
            console.log("------------------------------------------")
            res.status(200).send({ message: 'User returned successfully', user: removePassword(user)  });
        } catch (error) {
            res.status(500).send({ message: 'Error getting user', error: error.message });
        }
    },

    //create a new user
    createUser: async (req, res) => {
        console.log('createUser called');
        console.log('req.body:', req.body);
        try {
            //check the email is exists in database
            if (await userModel.findOne({ email: req.body.email })) {
                return res.status(401).send({ message: 'Email already exists' });
            };

            // Hash the password
            req.body.password = await bcrypt.hash(req.body.password, 10);

            //create a new user
            const user = await userModel.create(req.body);
            await user.save();
            console.log('New user created successfully', user);
            console.log("------------------------------------------")
            res.status(201).send({ message: 'New user created successfully', user: removePassword(user)  });
        } catch (error) {
            res.status(500).send({ message: 'Error creating user', error: error.message});
        }
    },

    //update user's profile
    updateUser: async (req, res) => {
        const userId = req.decodedToken._id;
        console.log('updateUser API called with userID:',userId);
        
        //check if accountType is in the request body
        if (req.body.accountType) {
            console.log(userId + " is trying to update account type with updateUser API.")
            return res.status(403).send({ message: 'Updating account type is not allowed' });
        }

        try {
            const user = await userModel.findByIdAndUpdate(
                userId,    //find the user by ID
                req.body,           //update the user with the request body
                { new: true, runValidators: true });    //returns the updated user instead of the old user
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            console.log('User updated successfully', removePassword(user) );
            console.log("------------------------------------------")
            res.status(200).send({ message: 'User updated successfully', user: removePassword(user)  });
        } catch (error) {
            res.status(500).send({ message: 'Error updating user', error: error.message });
        }
    },

    //delete user by id
    deleteUser: async (req, res) => {
        const adminId = req.decodedToken._id;
        const {userId} = req.body; //get the userId from the request body
        console.log('deleteUser called with userID:', adminId);
        try {
            const user = await userModel.findByIdAndDelete(userId);
            if (!user) {
                console.log('User not found', userId);
                return res.status(404).send({ message: 'User not found'});
            }
            console.log("User:" + userId + " is deleted by admin:" + adminId, user);
            console.log("------------------------------------------")
            res.status(200).send({ message: "User:" + userId + " is deleted by admin:" + adminId});
        } catch (error) {
            res.status(500).send({ message: 'Error deleting user', error: error.message });
        }
    },
    //active user by id
    activateUserById: async (req, res) => {
        try {
            const user = await UserModel
                .findByIdAndUpdate({ _id: req.params._id },
                    { isActive: true },
                    { new: true });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ success: true, user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }
    },
    //inactive user by id
    inactiveUserById: async (req, res) => {
        try {
            const user = await UserModel
                .findByIdAndUpdate({ _id: req.params._id },
                    { isActive: false },
                    { new: true });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ success: true, user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }
    },
    //login
    login: async (req, res) => {
        const { email, password } = req.body;
        console.log('login called with email:', email);
        try {
            //find a user with email
            const user = await userModel.findOne({ email: email});
            if (!user) {
                console.log('User not found');
                return res.status(404).send({ message: 'User not found' });
            }

            //compare the password
            const validPassword = await bcrypt.compare(password, user.password);

            //check if the password is correct
            if (!validPassword) {
                console.log('Invalid password');
                return res.status(401).send({ message: 'Invalid password' });
            }

            //create a token
            const token = createToken(user);
            console.log('User logged in successfully', user);
            console.log("------------------------------------------")
            res.status(200).send({ message: 'User logged in successfully', token: token});
        } catch (error) {
            res.status(500).send({ message: 'Error logging in', error: error.message });
        }
    },

}

module.exports = UserController;