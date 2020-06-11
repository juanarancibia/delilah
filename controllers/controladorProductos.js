const config = require("../config");
const Sequlieze = require("sequelize");
const sequelize = new Sequlieze(config.dbName, config.dbUser, config.dbPwd, {
  host: config.dbPort,
  dialect: config.dbDialect
});
const Producto = sequelize.import("../models/Producto");

var getProductos = function (req, res) {
  console.log(Producto);
  Producto.findAll().then((resultado) => {
    res.send(resultado);
  }).catch(err => res.status(404).send("No se encontró"));
};

var setProductos = function (req, res) {
  const { nombre, descripcion, precio } = req.body;
  Producto.create({
    nombre: nombre,
    descripcion: descripcion,
    precio: precio,
  })
    .then((nuevo) => {
      console.log(nuevo instanceof Producto);
      res.status(200).send(nuevo);
    })
    .catch((err) => {
      console.log(err);
      res.status(403).send(err);
    });
};

var deleteProductos = function (req, res) {
  const { id } = req.body;
  Producto.destroy({
    where: {
      Id_Producto: id,
    },
  })
    .then((response) => {
      if (response) {
        return res.status(200).send(response.toString());
      }
      res.status(404).send("No se encontro el producto");
    })
    .catch((err) => {
      console.log(err);
      res.status(403).send("ERROR");
    });
};

var updateProductos = function (req, res) {
  const { id, nombre, descripcion, precio } = req.body;
  Producto.update(
    {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
    },
    {
      where: {
        Id_Producto: id,
      },
    }
  )
    .then((updated) => {
      res.status(200).send(updated);
    })
    .catch((err) => {
      console.log(err);
      res.status(403).send("ERROR");
    });
};

module.exports = {
  getProductos: getProductos,
  setProductos: setProductos,
  updateProductos: updateProductos,
  deleteProductos: deleteProductos,
};
