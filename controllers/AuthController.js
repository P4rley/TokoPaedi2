const { User, Profile, Product } = require("../models");
const bcrypt = require("bcryptjs");
class AuthController {
  static home(req, res) {
    const username = req.session.username;
    res.render("partials/_navbar", { username });
  }

  static register(req, res) {
    const errors = req.query.error;
    res.render("register", { errors });
  }

  static postRegister(req, res) {
    const { email, username, password, role } = req.body;

    User.create({ email, username, password, role })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          const errors = err.errors.map((el) => {
            return el.message;
          });

          res.redirect(`/register?error=${errors}`);
        } else {
          res.send(err);
        }
      });
  }

  static login(req, res) {
    const errors = req.query.error;
    res.render("login", { errors });
  }

  static postLogin(req, res) {
    const { username, password } = req.body;

    User.findOne({ where: { username } })
      .then((user) => {
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password);
          if (isValidPassword) {
            req.session.userId = user.id;
            req.session.role = user.role;
            req.session.username = user.username;
            res.redirect("/");
          } else {
            const errors = "Username atau password yang kamu masukan salah";
            res.redirect(`/login?error=${errors}`);
          }
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/");
      }
    });
  }

  static userPage(req, res, next) {
    if (!req.session.userId || req.session.role === "buyer") {
      const errors = "Kamu tidak boleh masuk ke halaman ini";
      res.redirect(`/login?error=${errors}`);
    } else {
      next();
    }
  }

  static users(req, res) {
    const userId = req.session.userId;
    User.findByPk(+userId, {
      include: [Profile, Product],
    })
      .then((user) => {
        res.render("userPage", { user });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addUserProfile(req, res) {
    const userId = req.session.userId;
    Profile.findByPk(+userId)
      .then((profile) => {
        res.render("addUserProfile", { profile });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static createUserProfile(req, res) {
    const userId = req.session.userId;
    const { fullName, phone, age, gender, imageUrl, birthDate } = req.body;
    Profile.create({
      UserId: +userId,
      fullName,
      phone,
      age,
      gender,
      imageUrl,
      birthDate,
    })
      .then(() => {
        res.redirect("/users");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static editUserProfile(req, res) {
    const userId = req.session.userId;
    console.log(userId);
    Profile.findOne({ where: { UserId: +userId } })
      .then((profile) => {
        res.render("editUserProfile", { profile });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static updateUserProfile(req, res) {
    const userId = req.session.userId;
    const { fullName, phone, age, gender, imageUrl, birthDate } = req.body;

    Profile.update(
      { fullName, phone, age, gender, imageUrl, birthDate },
      { where: { UserId: +userId } }
    )
      .then(() => {
        res.redirect("/users");
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = AuthController;
