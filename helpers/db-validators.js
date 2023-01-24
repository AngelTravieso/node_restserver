const { Categoria } = require('../models');
const Role = require('../models/rol');
const Usuario = require('../models/usuario');

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

// Validar si el email existe en la colección (no debe repetirse)
const emailExiste = async (email = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ email });

    // Si el correo existe
    if (existeEmail) {
        throw new Error(`El correo, ${email} ya está registrado`);
    }
}

// Verificar si el ID dado para actualizar existe en la BD
const existeUsuarioPorId = async (id) => {
    // Verificar si usuario existe
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    }
}

// Verificar si el ID para traer la categoria existe en la BD
const existeCategoriaId = async (id) => {

    const existeCategoria = await Categoria.findById(id);

    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe`);
    }

}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaId,
}