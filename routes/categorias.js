const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('get');
});

// Obtener una categoria por ID - publico
router.get('/:id', (req, res) => {
    res.json('get por ID');
});

// Crear una nueva categoria - privado - cualquier persona con un token válido
router.post('/', (req, res) => {
    res.json('post');
});

// Actualizar un registro por este ID
router.put('/:id', (req, res) => {
    res.json('put');
});

// Borrar una categoria - ADMIN_ROLE
router.delete('/', (req, res) => {
    res.json('delete');
});


module.exports = router;