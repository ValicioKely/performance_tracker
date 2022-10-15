const router = require('express').Router();
const accountController =  require("../controllers/account.controller");


//account controller 

router.post('/register' , accountController.signUp);
router.get('/login/:id' , accountController.signIn);
router.post('/logout/:id' , accountController.signOut);

router.get('/', accountController.getAllAccount);
router.get('/:id' , accountController.accountInfo);




module.exports = router;