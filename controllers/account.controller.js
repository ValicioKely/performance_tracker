const signInError = require('../utils/account.error');


//create a trading account 
exports.signUp = async function (req , res) {
    const {name, login, broker , investPassword , server} = req.body;
    try {
       


    } catch (error) {
        signInError(error);
        res.status(400);
    }
}

//sign in to a existing account
exports.signIn = async function (req , res) {
    const {name, login, plateform , investPassword , server} = req.body;
    
    try {
       


    } catch (error) {
        signInError(error);
        res.status(400);
    }
}