"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "UserId" });
      User.hasOne(models.Profile, { foreignKey: "UserId" });
    }

    static hashPassword() {}
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username harus diisi",
          },
          notEmpty: {
            msg: "Username harus diisi",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email harus diisi",
          },
          notEmpty: {
            msg: "Email harus diisi",
          },
          isEmail: {
            msg: "Email harus diisi dalam format email",
          },
        },
        unique: {
          args: true,
          msg: 'Email address already in use!'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password harus diisi",
          },
          notEmpty: {
            msg: "Password harus diisi",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Role harus diisi",
          },
          notEmpty: {
            msg: "Role harus diisi",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
  });
  return User;
};
