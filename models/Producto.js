/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "producto",
    {
      idProducto: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "Id_Producto",
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
      precio: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        field: "precio",
      },
    },
    {
      tableName: "Producto",
      timestamps: false,
    }
  );
};
