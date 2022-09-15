const express = require('express');
const Controller = require('../controllers/productController');
const router = express.Router()
const routerProducts = require('./products');

router.get("/", Controller.landingPage)
router.use("/products", routerProducts)

module.exports = router