"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, { foreignKey: "UserId" });
    }

    get formattedBirthDate() {
      if (this.birthDate !== null) {
        return this.birthDate.toLocaleDateString("en-CA");
      } else {
        return this.birthDate;
      }
    }
  }
  Profile.init(
    {
      UserId: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      birthDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Profile"
    }
  );
  return Profile;
};
