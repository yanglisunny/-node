var express = require('express');
var router = express.Router();
var multer  = require('multer');
const uploader = require("../utils/uploader.js");

const PositionController = require('../controller/position.js');

router.post("/add", uploader.single('logo'), PositionController.add);
router.get("/show", PositionController.show);
router.get("/del", PositionController.del);
router.get("/getItem", PositionController.getItem);
router.post("/update", uploader.single('logo'), PositionController.update);
module.exports = router;