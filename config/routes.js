const controllerProd = require("../controllers/controladorProductos");
const controllerUsr = require("../controllers/controladorUsuarios");
const controllerPedidos = require("../controllers/controladorPedidos");
const validators = require("./validators");

module.exports = function (app) {
  app.get("/productos", controllerProd.getProductos);
  app.post(
    "/productos",
    validators.validarAdministrador,
    controllerProd.setProductos
  );
  app.put(
    "/productos",
    validators.validarAdministrador,
    controllerProd.updateProductos
  );
  app.delete(
    "/productos",
    validators.validarAdministrador,
    controllerProd.deleteProductos
  );

  app.post("/signup", controllerUsr.signUp);
  app.post("/login", controllerUsr.logIn);

  app.get(
    "/pedidosAll",
    validators.validarAdministrador,
    controllerPedidos.getPedidos
  );
  app.get("/pedidos", controllerPedidos.getPedidosUsuario);
  app.post("/pedidos", controllerPedidos.setPedido);
  app.put(
    "/pedidos",
    validators.validarAdministrador,
    controllerPedidos.updateEstado
  );
  app.delete("/pedidos", validators.validarAdministrador, controllerPedidos.deletePedido);
};
