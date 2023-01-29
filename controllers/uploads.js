const { response } = require("express");
const path = require('path');
const fs = require('fs');

const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');

// Cargar archivos
const cargarArchivo = async (req, res = response) => {

    try {
        // Imagenes
        // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');

        const nombre = await subirArchivo(req.files, undefined, 'imgs');

        res.json({
            nombre,
        });
    } catch (msg) {
        res.status(400).json({
            msg
        });
    }

}

// Actualiar img
const actualizarImagen = async (req, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            // Verificar si la coleccion tiene el ID que me llega
            modelo = await Usuario.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`,
                });
            }

            break;
        case 'productos':
            modelo = await Producto.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`,
                });
            }

            break;
        default:
            return res.status(500).json({
                msg: 'Se me olvidó validar esto'
            });
    }

    // Limpiar imagenes previas (borrar)

    // Si el modelo tiene propiedad img
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

        // Si la imagen existe
        if (fs.existsSync(pathImagen)) {
            // Se borra la imagen
            fs.unlinkSync(pathImagen);
        }

    }

    // Subir archivo (img) en carpeta (coleccion)
    const nombre = await subirArchivo(req.files, undefined, coleccion);

    // Agregar la img al modelo
    modelo.img = nombre;

    // Guardar nuevo modelo (puede ser usuario o productos)
    await modelo.save();

    // Retornar modelo
    res.json(modelo);

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
}