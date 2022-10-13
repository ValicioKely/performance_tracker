const router = require('express').Router();
const accountController =  require("../controllers/account.controller");


//account controller 

router.post('/register' , accountController.signUp);
router.post('/login' , accountController.signUp);


module.exports = router;