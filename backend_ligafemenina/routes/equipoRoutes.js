// equipoRoutes.js
const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

router.get('/', equipoController.getAllEquipos);
// router.get('/:idtipo', tipoController.getTipoById);
// router.post('/', tipoController.createTipo);
// router.put('/:idtipo', tipoController.updateTipo);
// router.delete('/:idtipo', tipoController.deleteTipo);

module.exports = router;
