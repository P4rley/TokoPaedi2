const express = require("express");
const AuthController = require("../controllers/AuthController");
const Controller = require("../controllers/productController");
const router = express.Router();

router.get("/register", AuthController.register);
router.post("/register", AuthController.postRegister);
router.get("/login", AuthController.login);
router.post("/login", AuthController.postLogin);
router.get("/logout", AuthController.logout);
router.get("/products/detail/:productId", Controller.detailProduct);
router.get("/users", AuthController.users);
router.get("/users/profile/add", AuthController.addUserProfile);
router.post("/users/profile/add", AuthController.createUserProfile);
router.get("/users/profile/edit", AuthController.editUserProfile);
router.post("/users/profile/edit", AuthController.updateUserProfile);

module.exports = router;
