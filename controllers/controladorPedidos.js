const config = require("../config");
const Sequlieze = require("sequelize");
const sequelize = new Sequlieze(config.dbName, config.dbUser, config.dbPwd, {
  host: config.dbPort,
  dialect: config.dbDialect
});
const Pedido = sequelize.import("../models/Pedido");
const EstXPed = sequelize.import("../models/EstadosXPedido");
const Detalle = sequelize.import("../models/DetallePedido");
const Estado = sequelize.import("../models/Estado");
const Producto = sequelize.import("../models/Producto");
const jwt = require("jsonwebtoken");

var getPedidosUsuario = function (req, res) {
  Pedido.hasMany(Detalle, {
    sourceKey: "idPedido",
    targetKey: "idPedido",
    foreignKey: "idPedido",
  });
  Detalle.belongsTo(Pedido, {
    sourceKey: "idPedido",
    targetKey: "idPedido",
    foreignKey: "idPedido",
  });
  Detalle.hasOne(Producto, {
    sourceKey: "idProducto",
    targetKey: "idProducto",
    foreignKey: "idProducto",
  });
  Producto.belongsTo(Detalle, {
    sourceKey: "idProducto",
    targetKey: "idProducto",
    foreignKey: "idProducto",
  });
  EstXPed.hasMany(Pedido, {
    sourceKey: "idPedido",
    targetKey: "idPedido",
    foreignKey: "idPedido",
  });
  Pedido.belongsTo(EstXPed, {
    sourceKey: "idPedido",
    targetKey: "idPedido",
    foreignKey: "idPedido",
  });
  EstXPed.hasOne(Estado, {
    sourceKey: "idEstadosXPedido",
    targetKey: "idEstado",
    foreignKey: "idEstado",
  });
  Estado.belongsTo(EstXPed, {
    sourceKey: "idEstado",
    targetKey: "idEstadosXPedido",
    foreignKey: "idEstadosXPedido",
  });

  const token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, "8497bpX@?K7Zc8fcDG3#cPVQV%#JaRGbjuan");
  Pedido.findAll({
    where: {
      idUsuario: payload.usuario,
    },
    include: [
      {
        model: Detalle,
        include: [
          {
            model: Producto,
          },
        ],
      },
      {
        model: EstXPed,
        include: [
          {
            model: Estado,
            attributes: ["nombre"],
          },
        ],
      },
    ],
  }).then((resultado) => {
    res.json(resultado);
  }).catch(err => res.status(403).json(err));
};

var setPedido = function (req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, "8497bpX@?K7Zc8fcDG3#cPVQV%#JaRGbjuan");
  const { formaPago, productos } = req.body;
  Pedido.create({
    idUsuario: payload.usuario,
    idFormaPago: formaPago,
    fechaHora: Date.now(),
  })
    .then((nuevo) => {
      EstXPed.create({ idPedido: nuevo.idPedido, fechaHora: Date.now() });
      if (productos) {
        productos.forEach((prod) => {
          Detalle.create({
            idPedido: nuevo.idPedido,
            idProducto: prod.id,
            cantidad: prod.cantidad,
            precio: (
              parseInt(prod.cantidad) * parseInt(prod.precio)
            ).toString(),
          });
        });
      }
      res.json(nuevo);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
};

var getPedidos = function (req, res) {
  Pedido.findAll()
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((err) => res.json(err));
};

var updateEstado = function (req, res) {
  const { idPedido, idEstado, descripcion } = req.body;
  Pedido.findAll({
    where: {
      idPedido: idPedido,
    },
  })
    .then((resultado) => {
      if (resultado.length > 0) {
        EstXPed.create({
          idEstadosXPedido: idEstado,
          idPedido: idPedido,
          fechaHora: Date.now(),
          descripcion: descripcion,
        })
          .then((nuevo) => {
            res.json(nuevo);
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.status(404).json("El pedido no existe");
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

function deletePedido(req, res) {
  const { idPedido } = req.body;
  Detalle.destroy({
    where: { idPedido: idPedido }
  }).then(() => {
    Pedido.destroy({
      where: {
        idPedido: idPedido
      }
    })
  }).then(resultado => res.json(resultado)).catch(err => res.status(403).json(err));
}


module.exports = {
  setPedido: setPedido,
  getPedidosUsuario: getPedidosUsuario,
  getPedidos: getPedidos,
  updateEstado: updateEstado,
  deletePedido: deletePedido
};
