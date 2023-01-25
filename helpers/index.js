const buscador = require('./buscador');
const coleccionesPermitidas = require('./colecciones');
const dbValidators = require('./db-validators');
const generarJWT = require('./generarJWT');
const googleVerify = require('./google-verify');
const hashField = require('./hash-field');

module.exports = {
    ...buscador,
    ...coleccionesPermitidas,
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...hashField,
}