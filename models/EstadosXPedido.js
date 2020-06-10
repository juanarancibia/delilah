/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "estadosXPedido",
    {
      idEstadosXPedido: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "Id_EstadosXPedido",
      },
      idPedido: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        field: "Id_Pedido",
      },
      fechaHora: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "FechaHora",
      },
      descripcion: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: "descripcion",
      },
    },
    {
      tableName: "EstadosXPedido",
      timestamps: false,
    }
  );
};
