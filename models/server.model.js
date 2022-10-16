const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema(
    {
        id: {
            type: String,
    },
        servername:{
            type: String,
            required: true,
            minLength: 5,
            unique: true
        },
        serverFile: {
            type: String,
            required: true,
            lowercase: true,
            unique:true, 
            trim: true
        },
}
) ;

module.exports = mongoose.model('Server' , ServerSchema);



