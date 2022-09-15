const express = require("express");
const AuthController = require("../controllers/AuthController");
const Controller = require("../controllers/productController");
const router = express.Router();

// router.get("/", Controller.products);
router.use(AuthController.userPage);
router.get("/add", Controller.addProduct);
router.post("/add", Controller.createProduct);
router.get("/edit/:productId", Controller.editProduct);
router.post("/edit/:productId", Controller.saveProduct);
router.get("/delete/:productId", Controller.deleteProduct);

module.exports = router;
