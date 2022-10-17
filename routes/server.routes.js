const router = require('express').Router();
const serverController =  require("../controllers/server.controller");
const multer = require("multer");
const upload = multer();

//server controller 
router.get('/', serverController.getAllServer);
router.get('/:id', serverController.serverInfo);
router.delete('/:id' , serverController.deleteServer);


//upload server
router.post("/upload", upload.single("file"), serverController.uploadServer);


module.exports = router;