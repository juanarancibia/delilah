const Sequlieze = require("sequelize");
const sequelize = new Sequlieze(
  "mysql://RocQd9YU1i:pbnPd2JL7Y@remotemysql.com/RocQd9YU1i"
);
const User = sequelize.import("../models/Usuario");
const Rol = sequelize.import("../models/Rol");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var signUp = function (req, res) {
  const { usuario, contrasena, email, tel, dir, rol, nom } = req.body;
  const hashedPwd = bcrypt.hashSync(contrasena, 5);
  User.create({
    usuario: usuario,
    contrasena: hashedPwd,
    email: email,
    telefono: tel,
    direccion: dir,
    idrol: rol,
    nombreYapellido: nom,
  })
    .then((nuevo) => {
      console.log(nuevo instanceof User);
      res.send(nuevo);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

var logIn = function (req, res) {
  User.hasOne(Rol, {
    foreignKey: "Id_rol",
    sourceKey: "idrol",
    targetKey: "Id_rol",
  });
  Rol.belongsTo(User, {
    sourceKey: "Id_Rol",
    foreignKey: "rol",
    targetKey: "idrol",
  });
  const { usuario, contrasena } = req.body;
  User.findAll({
    where: {
      usuario: usuario,
    },
    attributes: ["usuario", "contrasena"],
    include: [
      {
        model: Rol,
        attributes: ["nombre"],
      },
    ],
  })
    .then((resultado) => {
      if (resultado.length < 1) {
        res.status(401).json("Usuario o contraseña erroneos");
        return;
      }
      pwd = resultado[0].contrasena;
      if (bcrypt.compareSync(contrasena, pwd)) {
        res.json({
          token:
            jwt.sign(
              { usuario: usuario, rol: resultado[0].rol.nombre },
              "8497bpX@?K7Zc8fcDG3#cPVQV%#JaRGbjuan"
            )
        }
        );
      } else {
        res.status(401).send("Contraseña erronea");
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

module.exports = {
  signUp: signUp,
  logIn: logIn,
};
