// Para obtener el tipado
const { response, request } = require('express');


/*
    QueryParams (GET): 
        URL?variable=valor (http://localhost/api/usuarios?nombre=angel)
        req.query

    BodyParams (POST): 
        req.params
*/


const usuariosGet = (req = request, res = response) => {

    // const params = req.query;


    // Lo que necesito
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query; 

    res.json({
        msg: 'get API - usuariosGet',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - usuariosPost'    ,
        nombre,
        edad
    });
}

const usuariosPut = (req = request, res = response) => {

    // const id = req.params.id;

    // Extraer lo que necesito
    const { id } = req.params;

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