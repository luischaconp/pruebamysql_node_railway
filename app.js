const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

app.set("port", process.env.PORT || 3001);

// usar cualquier sistema operativo las rutas son distinta windows // o linux \\
app.set("view engine", "ejs");

// la carpeta public para archivos estaticos
app.use(express.static("public"));

// procesa los datos envaido desde los formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//para poder trabajar con las cookies
app.use(cookieParser());

// las variables de entorno
dotenv.config({ path: "./env/.env" });

// llamar desde la routes
app.use("/", require("./routes/router"));

//Para eliminar la cache
app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

app.listen(app.get("port"), () => {
  console.log(`Servidor en puerto ${app.get("port")}`);
});
