// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo equipo
const Jugadora = models.jugadora;

class JugadoraController {
  async createJugadora(req, res) {
    // Implementa la lógica para crear un nuevo plato
    const {
      nombre,
      apellidos,
      posicion,
      sueldo,
      disponible_jugar,
      fechainscripcion,
      idequipo,
    } = req.body;

    try {
      const nuevaJugadora = await Jugadora.create({
        nombre,
        apellidos,
        posicion,
        sueldo,
        disponible_jugar,
        fechainscripcion,
        idequipo,
      });

      res
        .status(201)
        .json(Respuesta.exito(nuevaJugadora, "Jugadora creada correctamente"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al crear una jugadora nueva`
          )
        );
    }
  }
}

module.exports = new JugadoraController();
