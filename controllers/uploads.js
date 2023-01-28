const { response } = require("express");

const { subirArchivo } = require('../helpers');

const cargarArchivo = async (req, res = response) => {

    // Imagenes
    const nombre = await subirArchivo(req.files);

    res.json({
        nombre,
    });

}

module.exports = {
    cargarArchivo,
}