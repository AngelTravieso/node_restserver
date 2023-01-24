const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias } = require('../controllers/categorias');

const router = Router();

const { validarJWT, validarCampos } = require('../middlewares');

// middleware personalizado para validar id de las rutas
// existeCategoria

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por ID - publico
router.get('/:id', (req, res) => {
    res.json('get por ID');
});

// Crear una nueva categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),

    validarCampos,
], crearCategoria);

// Actualizar un registro por este ID
router.put('/:id', (req, res) => {
    res.json('put');
});

// Borrar una categoria - ADMIN_ROLE
router.delete('/', (req, res) => {
    res.json('delete');
});


module.exports = router;