const UserModel = require('../models/user.model');
const {signUpError} = require('../utils/signUp.error')

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
