// equipoRoutes.js
const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

router.get('/', equipoController.getAllEquipos);
// router.get('/:idtipo', tipoController.getTipoById);
router.post('/', equipoController.createEquipo);
// router.put('/:idtipo', tipoController.updateTipo);
router.delete('/:idequipo', equipoController.deleteEquipo);

module.exports = router;
