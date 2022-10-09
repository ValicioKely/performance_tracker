const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
    },
    username:{
        type: String,
        required: true,
        minLength: 5,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique:true, 
        trim: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    },
}
) ;

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password , salt)
    next();
});

module.exports = mongoose.model('User' , UserSchema);



