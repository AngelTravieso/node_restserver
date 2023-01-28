const { response } = require("express");

const { subirArchivo } = require('../helpers');

const cargarArchivo = async (req, res = response) => {

    // propiedad donde vienen los objetos files que se suban
    // console.log(req.files);

    // Si no vienen archivos (files) en la request
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({
            msg: 'No hay archivos que subir',
        });
        return;
    }

    // Si no viene archivo (files) con nombre archivo (key del objeto)
    if (!req.files.archivo) {
        res.status(400).json({
            msg: 'No hay archivos que subir',
        });
        return;
    }

    // Imagenes
    const nombre = await subirArchivo(req.files);

    res.json({
        nombre,
    });


}

module.exports = {
    cargarArchivo,
}