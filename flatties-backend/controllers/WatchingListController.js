const WatchingListModel = require("../models/WatchingListModel")
const PropertyModel = require("../models/PropertyModel")
const UserModel = require("../models/UserModel")

const WatchingListController = {
    //get all watching lists
    getAllWatchingLists: async (req, res)=>{
        try {
            const watchingLists = await WatchingListModel.find({});
            res.json(watchingLists);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //create a new watching list
    createWatchingList: async (userId)=>{
        try {
            const watchingList = await WatchingListModel.create(req.body);
            res.json(watchingList);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //add a property to a watching list
    addPropertyToWatchingList: async (req, res)=>{
        try{
            //get the property id from the request 
            const propertyId = req.body.propertyId;

            //check the id is exits in the property collection
            const property = await PropertyModel.findById(propertyId);
            if(!property){
                return res.status(404).json({message: "Property not found"});
            }
            //check user exists
            const user = await UserModel.findById(req.UserModel._id);
            if(!user){
                return res.status(404).json({message: "User not found"});
            }

            //get the current user's watching list
            const watchingList = await WatchingListModel.findOne({userId: req.UserModel._id});
            if(!watchingList){
                //create a new watching list
                const newWatchingList = new WatchingListModel({
                    userId: req.UserModel._id,
                    propertyId: [propertyId],
                });
                await newWatchingList.save();
                return res.json({message: "Property added to the watching list"});
            }

            if(watchingList.propertyId.includes(propertyId)){
                return res.status(400).json({message: "Property already in the watching list"});
            }

            //add this property id to the watching list
            watchingList.propertyId.push(propertyId);

            await watchingList.save();
            res.json({message: "Property added to the watching list"});

        }catch(error){
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
      
    },
    //delete a watching list by id
    deleteWatchingListById: async (req, res) => {
        try {
            const watchingList = await WatchingListModel.deleteOne({_id: req.params.id});
            if(!watchingList){
                return res.status(404).json({message: "Watching List not found"});
            }
            res.json(watchingList);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },

};

module.exports = WatchingListController;