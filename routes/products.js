const express = require('express');
const Controller = require('../controllers/productController');
const router = express.Router()

// router.get("/", Controller.products);
router.get("/add", Controller.addProduct);
router.post("/add", Controller.createProduct);
router.get("/detail/:productId", Controller.detailProduct);
router.get("/edit/:productId", Controller.editProduct);
router.post("/edit/:productId", Controller.saveProduct);
router.get("/buy/:productId", Controller.buyProduct);
router.get("/delete/:productId", Controller.deleteProduct);

module.exports = router
