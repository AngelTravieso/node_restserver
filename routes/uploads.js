const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivos } = require('../middlewares');

const { cargarArchivo, actualizarImagen } = require('../controllers');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

// Cargar archivo
router.post('/', [
    validarArchivos,
    validarCampos,
], cargarArchivo);


router.put('/:coleccion/:id', [
    check('id', 'Ingresa un ID de mongo válido').isMongoId(),
    
    // Validar la coleccion
    check('coleccion').custom( coleccion => coleccionesPermitidas(coleccion, ['usuarios', 'productos'])),
    validarCampos,
], actualizarImagen);

module.exports = router;