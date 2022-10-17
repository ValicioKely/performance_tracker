const mongoose = require('mongoose');


const accountSchema = new mongoose.Schema(
    {
      name: {
        type : String ,
        required : true, 
        unique: true
      },
      platform : {
        type:  String,
        required: true
      },
      login: {
        type: String,
        required: true, 
        minLength: 5,
        unique: true
    },
      investPassword:{
        type: String,
        required: true,
        mingLength : 5
    },
      server: {
        type: String,
        required: true
    },
      quoteStreamingInterval: {
        type: String,//change to float important
        default: 2.5,
    },

      reliability: String, //For production environements
    }
) ;


module.exports = mongoose.model('account' , accountSchema);



