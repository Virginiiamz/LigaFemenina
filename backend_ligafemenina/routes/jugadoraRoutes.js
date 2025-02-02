// jugadoraRoutes.js
const express = require('express');
const router = express.Router();
const jugadoraController = require('../controllers/jugadoraController');

router.get('/', jugadoraController.getAllJugadoras);
// router.get('/:idequipo', equipoController.getEquipoById);
// router.get('/ciudad/:ciudad/esta_federado/:esta_federado', equipoController.getEquipoByCiudadAndFederado);
router.post('/', jugadoraController.createJugadora);
// router.put('/:idequipo', equipoController.updateEquipo);
// router.delete('/:idequipo', equipoController.deleteEquipo);

module.exports = router;
