// Importar libreria para manejo de ficheros de configuración
require("dotenv").config();
// Importar fichero de configuración con variables de entorno
const config = require("./config/config");
// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar libreria CORS
const cors = require("cors");

// Importar gestores de rutas
const equipoRoutes = require("./routes/equipoRoutes");
const jugadoraRoutes = require("./routes/jugadoraRoutes");

const app = express();

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());
// Configurar CORS para admitir cualquier origen
app.use(cors());
// app.use(
//   cors({
//     //origin: "http://localhost:5173", // Permitir el frontend en desarrollo
//     origin: "http://localhost:8081",
//     credentials: true, // Permitir envío de cookies
//   })
// );

// Configurar rutas de la API Rest
app.use("/api/equipo", equipoRoutes);
app.use("/api/jugadora", jugadoraRoutes);

// Configurar el middleware para servir archivos estáticos desde el directorio 'public\old_js_vainilla'
app.use(express.static(path.join(__dirname, "public")));

//Ruta para manejar las solicitudes al archivo index.html
// app.get('/', (req, res) => {
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, () => {
    console.log(`Servidor escuchando en el puerto ${config.port}`);
  });
}

module.exports = app;