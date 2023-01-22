const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

/*
este archivo index.js es un archivo de barril para optimizar las importaciones
exporta todas las funciones que se encuentran en el archivo
*/
module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
}