const { response } = require("express");
const path = require('path');

const cargarArchivo = (req, res = response) => {

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

    const { archivo } = req.files;

    // Path donde se almacenará el archivo
    const uploadPath = path.join(__dirname,'../uploads/', archivo.name);

    // Mover el archivo al directorio uploads
    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({err});
        }

        res.json({
            msg: `El archivo se subio a ${uploadPath}`,
        });
    });
}

module.exports = {
    cargarArchivo,
}