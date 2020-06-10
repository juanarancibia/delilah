/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "pedido",
    {
      idPedido: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        references: {
          model: "EstadosXPedido",
          key: "id_pedido",
        },
        field: "Id_Pedido",
      },
      idUsuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
          model: "Usuario",
          key: "usuario",
        },
        field: "Id_Usuario",
      },
      precio: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "Precio",
      },
      idFormaPago: {
        type: DataTypes.ENUM("Efectivo", "Tarjeta"),
        allowNull: false,
        field: "Id_FormaPago",
      },
      fechaHora: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "FechaHora",
      },
    },
    {
      tableName: "Pedido",
      timestamps: false,
    }
  );
};
