"use strict";
const { Model } = require("sequelize");
const formatRupiah = require("../helpers/formatRupiah");
const { Op } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: "UserId" });
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
    }

    static productHasStock() {
      let option = {}
      option.where = {
        stock: {
          [Op.gt]: 0
        }
      }
      return option
    }

    formattedPrice() {
      const price = String(this.price)
      return formatRupiah(price, 'Rp.')
    }
  }
  Product.init(
    {
      UserId: DataTypes.INTEGER,
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Harus pilih Category !"
          },
          notNull: {
            msg: "Harus pilih Category !"
          }
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Nama produk tidak boleh kosong !"
          },
          notNull: {
            msg: "Nama Produk tidak boleh kosong !"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description tidak boleh kosong !"
          },
          notNull: {
            msg: "Description tidak boleh kosong !"
          }
        }
      },
      stock: DataTypes.INTEGER,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Harga tidak boleh kosong !"
          },
          min: {
            args: [1000],
            msg: 'Harga harus lebih dari 100'
          },
          notNull: {
            msg: "Harga tidak boleh kosong !"
          }
        }
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Harus mencantumkan link product image !"
          },
          notNull: {
            msg: "Harus mencantumkan link product image !"
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        beforeCreate(Product, option) {
          Product.stock = '0'
        }
      }
    }
  );
  return Product;
};
