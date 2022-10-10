const userModel = require('../models/user.model');
const UserModel = require('../models/user.model');
const {signUpError , signInError} = require('../utils/auth.error')

exports.signUp = async function (req , res) {
    const {username , email , password} = req.body;
    
    try {
        const user = await UserModel.create({username , email , password});
        res.status(200).json({user: user._id});
        
    } catch (error) {
        signUpError(error);
        res.status(400);
    }
}

exports.signIn = async function (req , res) {
    const {email , password} = req.body;
    
    try {
        const user  =await userModel.login(email , password);
        res.status(200).json({user: user._id});
    } catch (error) {
        signInError(error);
        res.status(400);
    }
}
