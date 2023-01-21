const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const Role = require('../models/rol');

const { validarCampos } = require('../middlewares/validar-campos');

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
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

    /*
        1. custom() para pasar funcion personalizada y validar un parametro de la request
        2. rol = '' : es el valor 'rol' que me llega en la peticion (request), si no llega nada que sea String vacio
        3. busco en mi colecciòn de 'Roles' y verifico que el rol que llega en la peticiòn este guardado en mi colecciòn de 'Roles'
        4. muestro error personalizado (no revienta la app) 
    */

    check('rol').custom(async (rol = '') => {
        const existeRol = await Role.findOne({ rol });

        if (!existeRol) {
            // lanzar error personalizado (no revienta la app)
            throw new Error(`El rol ${rol} no está registrado en la BD`);
        }

    }),
    validarCampos
], usuariosPost);

router.put('/', usuariosPut);

// Ruta con parametro opcional (params)
router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);


module.exports = router;