const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { cargarArchivo } = require('../controllers');
const { validarArchivos } = require('../middlewares');

const router = Router();

// Cargar archivo
router.post('/',[
    validarArchivos,
    validarCampos,
] , cargarArchivo);

module.exports = router;