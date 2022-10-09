const mongoose = require('mongoose');


const UserModel = {
    id: String,
    username: String,
    email: String,
    password: String,
}  ;


module.exports = mongoose.model('User' , UserModel);



