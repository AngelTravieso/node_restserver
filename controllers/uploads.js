const { response } = require("express");

const { subirArchivo } = require('../helpers');

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
const actualizarImagen = async (req, res = response ) => {

    const { coleccion, id} = req.params;

    res.json({
        coleccion,
        id,
    });


}

module.exports = {
    cargarArchivo,
    actualizarImagen,
}