// jugadoraRoutes.js
const express = require('express');
const router = express.Router();
const jugadoraController = require('../controllers/jugadoraController');

router.get('/', jugadoraController.getAllJugadoras);
router.get('/:idjugadora', jugadoraController.getJugadoraById);
// router.get('/ciudad/:ciudad/esta_federado/:esta_federado', equipoController.getEquipoByCiudadAndFederado);
router.post('/', jugadoraController.createJugadora);
router.put('/:idjugadora', jugadoraController.updateJugadora);
router.delete('/:idjugadora', jugadoraController.deleteJugadora);

module.exports = router;
