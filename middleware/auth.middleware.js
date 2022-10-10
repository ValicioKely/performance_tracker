const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');



exports.checkToken = async function (req , res ,next) {
    const token = req.cookie.jwt; 
    if(token){
        jwt.verify(token , process.env.SECRET ,async function (err , decodedToken)  {
            if(err){
                res.locals.user = null;
                res.cookie(jwt , '' , {maxAge : 1 });
                next();
            }
            else{
                const user =  await userModel.findById(decodedToken.id);
                res.locals.user;
                next()
            }
        })
    }
    else{
        res.locals.user = null;
        console.log("There is no token ");
        next();
    }
};