/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "estado",
    {
      idEstado: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        field: "Id_estado",
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
      tableName: "Estado",
      timestamps: false,
    }
  );
};
