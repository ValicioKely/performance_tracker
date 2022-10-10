const router = require('express').Router();
const userController =  require("../controllers/user.controller");
const  authController =  require("../controllers/auth.controller");


//connect to database
require('../config/db');


//authController
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.signOut);


//userController
router.get('/', userController.getAllUser);
router.get('/:id', userController.userInfo);
router.post('/:id' , userController.updateUser);
router.delete('/:id' , userController.deleteUser);


module.exports = router;