const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class CartHasProducts extends Model {}

CartHasProducts.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    total: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "CartHasProducts",
  }
);

module.exports = CartHasProducts;
