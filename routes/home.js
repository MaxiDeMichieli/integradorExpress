const express = require('express');
const router = express.Router();

let homeController = require('../controller/homeController');

router.get('/', homeController.home);


module.exports = router;