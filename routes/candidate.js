var express = require('express');
var router = express.Router();
var multer  = require('multer');
const uploader = require("../utils/uploader.js");

const candidateController = require('../controller/candidate.js');

router.post("/add", uploader.single('picture'), candidateController.add);
router.get("/show", candidateController.show);
router.get("/getItem", candidateController.getItem);
/*router.get("/del", candidateController.del);*/
router.post("/update", uploader.single('picture'), candidateController.update);
module.exports = router;