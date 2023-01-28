const { response } = require("express");

const { subirArchivo } = require('../helpers');

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

module.exports = {
    cargarArchivo,
}