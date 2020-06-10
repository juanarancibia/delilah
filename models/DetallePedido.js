/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "detallePedido",
    {
      idDetalle: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "Id_Detalle",
      },
      idPedido: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        field: "Id_Pedido",
      },
      idProducto: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "Producto",
          key: "id_producto",
        },
        field: "Id_Producto",
      },
      cantidad: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        field: "Cantidad",
      },
      precio: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        field: "Precio",
      },
    },
    {
      tableName: "DetallePedido",
      timestamps: false,
    }
  );
};
