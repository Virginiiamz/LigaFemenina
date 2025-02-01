// equipoRoutes.js
const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

router.get('/', equipoController.getAllEquipos);
router.get('/:idequipo', equipoController.getEquipoById);
router.get('/ciudad/:ciudad/esta_federado/:esta_federado', equipoController.getEquipoByCiudadAndFederado);
router.post('/', equipoController.createEquipo);
router.put('/:idequipo', equipoController.updateEquipo);
router.delete('/:idequipo', equipoController.deleteEquipo);

module.exports = router;
