/* jshint indent: 2 */
const User = require("./Usuario");

module.exports = function (sequelize, DataTypes) {
  const rol = sequelize.define(
    "rol",
    {
      idRol: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        field: "Id_rol",
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "nombre",
      },
      descripcion: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: "descripcion",
      },
    },
    {
      tableName: "Rol",
      timestamps: false,
    }
  );

  return rol;
};
