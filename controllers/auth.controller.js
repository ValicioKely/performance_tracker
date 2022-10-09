const UserModel = require('../models/user.model');


exports.signUp = function (req , res) {
    const {username , email , password} = req.body;
    
    try {
        const newUser = await UserModel.create({username , email , password});
        
    } catch (error) {
        console.log(`erreur de registration ${error}`);
    }
}
