// jugadoraRoutes.js
const express = require('express');
const router = express.Router();
const jugadoraController = require('../controllers/jugadoraController');

router.get('/', jugadoraController.getAllJugadoras);
router.get('/grafica', jugadoraController.getGraficaJugadoras);
router.get('/:idjugadora', jugadoraController.getJugadoraById);
router.get('/equipo/:idequipo/disponible_jugar/:disponible_jugar', jugadoraController.getJugadoraByEquipoAndDisponibleJugar);
router.post('/', jugadoraController.createJugadora);
router.put('/:idjugadora', jugadoraController.updateJugadora);
router.delete('/:idjugadora', jugadoraController.deleteJugadora);

module.exports = router;
