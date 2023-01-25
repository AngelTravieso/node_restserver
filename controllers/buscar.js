const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario } = require('../models');

const coleccionesPermitidas = [
    'categoria',
    'productos',
    'rol',
    'usuarios',
];

const buscarUsuarios = async( termino = '', res = response ) => {

    // Validar si el termino es un ID de mongo válido
    const esMongoID = ObjectId.isValid( termino );

    // Si es un ID válido
    if(esMongoID) {
        const usuario = await Usuario.findById( termino );
        return res.json({
            // Si el usuario existe regreso un arreglo con el usuario, si no un array vacio
            results: ( usuario ) ? [ usuario ] : [],
        });
    }

    // buscar el termino haciendolo insensible a mayusculas o minusculas
    const regexp = new RegExp(termino, 'i');

    // Búsqueda por nombre o correo
    const [ total, usuarios ] = await Promise.all([
        Usuario.count({
            // or de mongo db, [ querys ]
            $or: [{nombre: regexp }, { email: regexp}],
            // que el usuario este activo
            $and: [{  state: true }],
        }),
        // El find regresa un arreglo vacio si no consigue resultados
        Usuario.find({
            // or de mongo db, [ querys ]
            $or: [{nombre: regexp }, { email: regexp}],
            // que el usuario este activo
            $and: [{  state: true }],
        }),
    ]);
    
    return res.json({
        total,
        results: usuarios,
    });


}

const buscar = (req, res = response) => {

    // Obtener parametros de busqueda
    const {
        coleccion,
        termino
    } = req.params;

    // Validar la coleccion por la que se busca
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las coleciones permitidas son ${coleccionesPermitidas}`,
        });
    }

    switch (coleccion) {
        case 'categoria':
            break;
        case 'productos':
            break;
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvidó haceer esta búsqueda',
            });
    }

    // res.json({
    //     coleccion,
    //     termino,
    // });

}


module.exports = {
    buscar,
}