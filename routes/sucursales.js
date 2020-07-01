const express = require('express');
const router = express.Router();

let sucursalesController = require('../controller/sucursalesController');

router.get('/', sucursalesController.sucursales);

router.get('/:sucursal', sucursalesController.sucursal);


module.exports = router;