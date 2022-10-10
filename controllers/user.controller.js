const { ObjectId } = require('mongodb');
const userModel = require('../models/user.model');


exports.getAllUser = async function (req , res) {
    const users = await userModel.find().select("-password");
    res.status(200).json({users});
}


exports.userInfo = async function (req , res) {
    if(!ObjectId.isValid(req.params.id)){
        console.log (`ID unknwon ${req.params.id}`)
    }
    const user = await userModel.findById(req.params.id).select("-password");
    res.status(200).json({user});
}