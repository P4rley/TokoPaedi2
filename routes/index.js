const express = require("express");
const Controller = require("../controllers/productController");
const router = express.Router();
const routerProducts = require("./products");
const routerLogin = require("./login");

router.get("/", Controller.landingPage);
router.use(routerLogin);
router.use("/products", routerProducts);

module.exports = router;
