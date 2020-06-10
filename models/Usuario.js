/* jshint indent: 2 */
const Rol = require("./Rol");

module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define(
    "usuario",
    {
      usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        field: "usuario",
      },
      contrasena: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "contrasena",
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "email",
      },
      telefono: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        field: "telefono",
      },
      direccion: {
        type: DataTypes.STRING(75),
        allowNull: false,
        field: "direccion",
      },
      idrol: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "Rol",
          key: "id_rol",
        },
        field: "rol",
      },
      nombreYapellido: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "nombreYapellido",
      },
    },
    {
      tableName: "Usuario",
      timestamps: false,
    }
  );

  return user;
};
