const express = require("express");
const app = express();
const routes = require("./config/routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Servidor iniciado");
});

routes(app);
