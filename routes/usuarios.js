const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');

/*
    url, middleware?, controlador
*/

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');


router.get('/', usuariosGet);

/*
Crea un middleware para validar uno o mas campos de la peticion entrante
*/
// router.post('/', [
//     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
//     check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
//     check('email', 'El email no es válido').isEmail,
//     check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
//     validarCampos
// ], usuariosPost);


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

    /*
    cuando se omiten los argumentos se pasan implicitamente
    a la función
    check('rol').custom( (rol) => esRoleValido(rol)),
    */
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.put('/', usuariosPut);

// Ruta con parametro opcional (params)
router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);


module.exports = router;