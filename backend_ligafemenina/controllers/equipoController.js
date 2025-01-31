// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo equipo
const Equipo = models.equipo;

class EquipoController {
  async getAllEquipos(req, res) {
    try {
      const data = await Equipo.findAll(); // Recupera todos los equipos
      res.json(Respuesta.exito(data, "Datos de los equipos recuperados"));
    } catch (err) {
      // Handle errors during the model call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos de los equipos: ${req.originalUrl}`
          )
        );
    }
  }

  async createEquipo(req, res) {
    // Implementa la lógica para crear un nuevo plato
    const equipo = req.body;

    try {
      const nuevoEquipo = await Equipo.create(equipo);

      res.status(201).json(Respuesta.exito(nuevoEquipo, "Equipo creado correctamente"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear un plato nuevo: ${equipo}`));
    }
  }

  async deleteEquipo(req, res) {
    const idequipo = req.params.idequipo;
    try {
      const numFilas = await Equipo.destroy({
        where: {
          idequipo: idequipo,
        },
      });
      if (numFilas == 0) {
        // No se ha encontrado lo que se quería borrar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado: " + idequipo));
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al eliminar los datos: ${req.originalUrl}`
          )
        );
    }
  }
}

module.exports = new EquipoController();

// Structure of result (MySQL)
// {
//   fieldCount: 0,
//   affectedRows: 1, // Number of rows affected by the query
//   insertId: 1,     // ID generated by the insertion operation
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0   // Number of rows changed by the query
// }
