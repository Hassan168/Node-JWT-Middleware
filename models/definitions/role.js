const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Role extends Model {}

Role.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "Role",
  }
);

module.exports = Role;
