// Para obtener el tipado
const {
    response,
    request
} = require('express');

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

const usuariosPost = async (req, res = response) => {

    // const {
    //     nombre,
    //     edad
    // } = req.body;
    const body = req.body;

    /*
    lo que no esté incluido en mi modelo y venga en la peticion
    mongoose lo ignorará y no lo insertara en la coleccion de mongo
    */

    // instanciar modelo
    const usuario = new Usuario(body);

    // para guardar la coleccion (por defecto no lo guarda)
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

const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch',
    });
}

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