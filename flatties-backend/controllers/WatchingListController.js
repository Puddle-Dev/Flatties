const WatchingListModel = require("../models/WatchingListModel");
const UserModel = require("../models/UserModel");

const WatchingListController = {
    createWatchingList: async (req, res) => {
        try {
            const watchingList = await WatchingListModel.create(req.body);
            res.status(200).json({ success: true, watchingList });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }
    },

    getUserWatchingList: async (req, res) => {
        try {
            const userId = req.params._id;
            const watchingList = await WatchingListModel.findOne({ userId: userId });
            if (!watchingList) {
                return res.status(404).json({ message: "Watching List not found" });
            }

            res.status(200).json({ "watchingList": watchingList, "list": watchingList.list });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }

    },

    addPropertyToWatchingList: async (req, res) => {
        try {
            const userId = req.params._id;
            const propertyId = req.params.propertyId;

            const user = await UserModel.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const watchingList = await WatchingListModel.findOne({ userId: userId });
            if (!watchingList) {
                return res.status(404).json({ message: "Watching list not found" });
            }

            const isPropertyExist = await WatchingListModel.find({ userId: userId, propertyId: propertyId });
            if (isPropertyExist) {
                return res.status(400).json({ message: "Property already in the watching list" });
            }

            user.watchingList.push({ propertyId: propertyId });
            user.watchingList.setUpdate({ status: "watching" });
            const updatedWatchingList = await user.save();
            res.status(200).json({ success: true, message: 'Property added to watching list successfully', updatedWatchingList });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }
    },

    removePropertyFromWatchingList: async (req, res) => {
        try {
            const userId = req.params._id;
            const propertyId = req.params.propertyId;

            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPropertyExist = user.watchingList.some(item => item.propertyId.equals(propertyId));
            if (!isPropertyExist) {
                return res.status(400).json({ message: "Property not found in the watching list" });
            }

            user.watchingList = user.watchingList.filter(item => !item.propertyId.equals(propertyId));
            const updatedWatchingList = await user.save();
            res.status(200).json({ success: true, message: 'Property removed from watching list successfully', updatedWatchingList });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }
    },

    updateWatchingProperty: async (req, res) => {
        try {
            const userId = req.params._id;
            const propertyId = req.params.propertyId;
            const status = req.body.status;

            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPropertyExist = user.watchingList.some(item => item.propertyId.equals(propertyId));
            if (!isPropertyExist) {
                return res.status(400).json({ message: "Property not found in the watching list" });
            }

            user.watchingList.forEach(item => {
                if (item.propertyId.equals(propertyId)) {
                    item.status = status;
                    item.appointmentDate = req.body.appointmentDate;
                }
            });
            const updatedWatchingList = await user.save();
            res.status(200).json({ success: true, message: 'Property updated in watching list successfully', updatedWatchingList });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }
    },

    deleteWatchingListById: async (req, res) => {
        try {
            const watchingList = await WatchingListModel.deleteOne({ _id: req.params.id });
            if (!watchingList) {
                return res.status(404).json({ message: "Watching List not found" });
            }
            res.json(watchingList);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }
    },
};

module.exports = WatchingListController;
