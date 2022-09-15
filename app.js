const express = require("express");
const AuthController = require("./controllers/AuthController");
const app = express();
const session = require("express-session");
const port = 3000;
const router = require("./routes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: true },
  })
);

app.get("/", AuthController.home);
app.get("/register", AuthController.register);

app.post("/register", AuthController.postRegister);
app.get("/login", AuthController.login);
app.post("/login", AuthController.postLogin);
app.get("/logout", AuthController.logout);

app.use(AuthController.userPage);
app.get("/users", AuthController.users);
app.get("/users/profile/add", AuthController.addUserProfile);
app.post("/users/profile/add", AuthController.createUserProfile);
app.get("/users/profile/edit", AuthController.editUserProfile);
app.post("/users/profile/edit", AuthController.updateUserProfile);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
