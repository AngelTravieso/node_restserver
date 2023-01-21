// Para obtener el tipado
const {
    response,
    request
} = require('express');

const bcriptjs = require('bcryptjs');

// en mayuscula para crear nuevas instancias del modelo
const Usuario = require('../models/usuario');


/*
    QueryParams (GET): 
        URL?variable=valor (http://localhost/api/usuarios?nombre=angel)
        req.query

    Body (POST)
        req.body

    BodyParams (PUT): 
        req.params
*/

// Obtener usuario
const usuariosGet = (req = request, res = response) => {

    // const params = req.query;

    // Lo que necesito
    const {
        q,
        nombre = 'No name',
        apikey,
        page = 1,
        limit
    } = req.query;

    res.json({
        msg: 'get API - usuariosGet',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

// Crear usuario
const usuariosPost = async (req, res = response) => {
    // obtener body completo
    // const body = req.body;

    // desestructurar parametros
    const {
        nombre,
        email,
        password,
        rol
    } = req.body;

    /*
    lo que no esté incluido en mi modelo y venga en la peticion
    mongoose lo ignorará y no lo insertara en la coleccion de mongo
    */

    // instanciar modelo
    const usuario = new Usuario({
        nombre,
        email,
        password,
        rol
    });

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ email });

    // Si el correo existe
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }

    // Encriptar la contraseña
    const salt = bcriptjs.genSaltSync(); // numero de vueltas para hacer mas complicada la desencriptacion (default 10)

    // Encriptar en una sola via
    usuario.password = bcriptjs.hashSync(password, salt);


    // Guardar en BD
    await usuario.save();

    // cambiar codigo HTTP de la respuesta
    // res.status(201).json({
    //     msg: 'post API - usuariosPost',
    // });

    res.json({
        // msg: 'post API - usuariosPost',
        usuario
    });
}

// Actualizar Usuario
const usuariosPut = (req = request, res = response) => {

    // const id = req.params.id; (http://localhost:8082/api/usuarios/10)

    // Extraer lo que necesito
    const {
        id
    } = req.params;

    res.status(401).json({
        msg: 'put API - usuariosPut',
        id,
    });
}

// Actualizar (el patch es parcial)
const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch',
    });
}

// Eliminar Usuario
const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete',
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
};