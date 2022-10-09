const router = require('express').Router();
const userController =  require("../controllers/user.controller");
const  authController =  require("../controllers/auth.controller");


//connect to database


//authController
router.post('/register', authController.newUser);



//userController
router.get('/', userController.getAllUser);
router.get('/:id', userController.userInfo);

module.exports = router;