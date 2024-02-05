const WatchingListModel = require("../models/WatchingListModel")
const UserModel = require("../models/UserModel")

const WatchingListController = {

    //create a new watching list
    //***Note:new watching list should be created when a new user is being created***//
    createWatchingList: async (req, res)=>{
        try {
            const watchingList = await WatchingListModel.create(req.body);
            res.status(200).json({success:true, watchingList});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },

    //get all properties in a watching list
    getAllPropertiesInWatchingList: async (req, res)=>{
          try {
            const userId = req.params.userId;
            const user = await UserModel.findById(userId);
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            res.json(user.watchingList);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
          }
    },
    //add a property to a watching list
    addPropertyToWatchingList: async (req, res)=>{
        try{
            //get user and property from request
            const userId = req.parmas.userId;
            const propertyId = req.params.propertyId;

            //check if user exist
            const user = await UserModel.findById(userId);
            if(!user){
                return res.status(404).json({message: "User not found"});
            }

            //check if property exist in user's watching list
            const isPropertyExist = user.watchingList.some(item => item.propertyId.equals(propertyId));
            if(isPropertyExist){
                return res.status(400).json({message: "Property already in the watching list"});
            }

            //add property to user's watching list
            user.watchingList.push({propertyId: propertyId, status: "watching"});
            const updatedWatchingList = await user.save();
            res.status(200).json({ success: true, message: 'Property added to watching list successfully', updatedWatchingList });
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //remove a property from a watching list
    removePropertyFromWatchingList: async (req, res)=>{
        try{
            //get user and property from request
            const userId = req.parmas.userId;
            const propertyId = req.params.propertyId;

            //check if user exist
            const user = await UserModel.findById(userId);
            if(!user){
                return res.status(404).json({message: "User not found"});
            }

            //check if property exist in user's watching list
            const isPropertyExist = user.watchingList.some(item => item.propertyId.equals(propertyId));
            if(!isPropertyExist){
                return res.status(400).json({message: "Property not found in the watching list"});
            }

            //remove property from user's watching list
            user.watchingList = user.watchingList.filter(item => !item.propertyId.equals(propertyId));
            const updatedWatchingList = await user.save();
            res.status(200).json({ success: true, message: 'Property removed from watching list successfully', updatedWatchingList });
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },
    //update watching property
    updateWatchingProperty: async (req, res)=>{
        try{
            //get user and property from request
            const userId = req.parmas.userId;
            const propertyId = req.params.propertyId;
            const status = req.body.status;

            //check if user exist
            const user = await UserModel.findById(userId);
            if(!user){
                return res.status(404).json({message: "User not found"});
            }

            //check if property exist in user's watching list
            const isPropertyExist = user.watchingList.some(item => item.propertyId.equals(propertyId));
            if(!isPropertyExist){
                return res.status(400).json({message: "Property not found in the watching list"});
            }

            //update property status and appointment date
            user.watchingList.forEach(item => {
                if(item.propertyId.equals(propertyId)){
                    item.status = status;
                    item.appointmentDate = req.body.appointmentDate;
                }
            });
            const updatedWatchingList = await user.save();
            res.status(200).json({ success: true, message: 'Property updated in watching list successfully', updatedWatchingList });
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    },

    //delete a watching list by id
    //***Note: user's watching list should be deleted when a new user is being deleted***//
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