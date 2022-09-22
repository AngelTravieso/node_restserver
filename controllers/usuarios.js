const { response } = require('express');


const usuariosGet = (req, res) => {
    res.json({
        msg: 'get API - Controller',
    });
}

const usuariosPost = (req, res) => {
    res.status(201).json({
        msg: 'post API - Controller',
    });
}

const usuariosPut = (req, res) => {
    res.status(401).json({
        msg: 'put API - Controller',
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - Controller',
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - Controller',
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
};