const express = require('express');
const router = express.Router();

let autosController = require('../controller/autosController');

router.get('/', autosController.autos);

router.get('/:marca/:dato?', autosController.marcaDato);


module.exports = router;