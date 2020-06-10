const jwt = require("jsonwebtoken");

var validarAdministrador = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verificarToken = jwt.verify(
      token,
      "8497bpX@?K7Zc8fcDG3#cPVQV%#JaRGbjuan"
    );
    console.log(verificarToken);
    if (verificarToken.rol == "Administrador") {
      return next();
    }
    res.send("No esta autorizado para realizar esta operacion");
  } catch (err) {
    console.log(err);
    res.json({ error: "error al validar al usuario" });
  }
};

module.exports = {
  validarAdministrador: validarAdministrador,
};
