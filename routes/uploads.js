const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { cargarArchivo } = require('../controllers');

const router = Router();

// Cargar archivo
router.post('/', cargarArchivo);

module.exports = router;