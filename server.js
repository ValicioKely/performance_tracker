const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/user.routes')
//connect to database
require('./config/db');


//User
app.use('/api/user' , userRoutes);


app.listen(process.env.PORT , () => {
    console.log(`Listening to the port ${process.env.PORT}` )
});
