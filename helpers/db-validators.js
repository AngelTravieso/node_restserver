const Role = require('../models/rol');

// Validar roles contra la BD

/*
    1. custom() para pasar funcion personalizada y validar un parametro de la request
    2. rol = '' : es el valor 'rol' que me llega en la peticion (request), si no llega nada que sea String vacio
    3. busco en mi colecciòn de 'Roles' y verifico que el rol que llega en la peticiòn este guardado en mi colecciòn de 'Roles'
    4. muestro error personalizado (no revienta la app) 
*/

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        // lanzar error personalizado (no revienta la app)
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }

}


module.exports = {
    esRoleValido,
}