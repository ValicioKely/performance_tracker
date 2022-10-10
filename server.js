const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();
require('dotenv').config();
const userRoutes = require('./routes/user.routes')
const middleware = require('./middleware/auth.middleware');


//connect to database
require('./config/db');

app.use(bodyParser.json());
app.use(cookieParser());

//User
app.get("*" , middleware.checkToken);
app.get("/tokenid" , middleware.authGuard , (req ,res) => {
    res.status(200).send(res.locals.user.id)
}  );
app.use('/api/user' , userRoutes);



app.listen(process.env.PORT , () => {
    console.log(`Listening to the port ${process.env.PORT}` )
});
