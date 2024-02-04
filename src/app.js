const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middlewares/errorHandler");
require('dotenv').config();

// Configuración Middleware con el Servidor de Autorización 
const autenticacion = auth({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: "RS256",
});

const app = express();
app.use(express.json());

// Importamos el Router de Usuarios
const usuariosRouter = require("./routes/usuarios");

// Configuramos el middleware de autenticación para las rutas de usuarios
app.use("/api/usuarios", autenticacion, usuariosRouter);

// Manejador de errores
app.use(errorHandler);

// Iniciamos el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

module.exports = app;