/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "formaPago",
    {
      idFormaPago: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        field: "Id_FormaPago",
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "nombre",
      },
    },
    {
      tableName: "FormaPago",
      timestamps: false,
    }
  );
};
