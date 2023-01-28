const { response } = require("express");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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

    const nombreCortado = archivo.name.split('.');

    // Obtener extension del archivo, busco por la ultima posicion del split
    const extension = nombreCortado[ nombreCortado.length - 1];

    // Validar la extension
    const extensionesValidas = [
        'png', 'jpg', 'jpeg', 'gif',
    ];

    // Si la extension no es valida
    if(!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            msg: `La extensión ${extension} no es permitida, solo se permite ${extensionesValidas}`,
        });
    }


    // Cambiar nombre de archivo 
    // Ej:'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed.png'
    const nombreTemp = uuidv4() + '.' + extension;

    // Path donde se almacenará el archivo
    const uploadPath = path.join(__dirname,'../uploads/', nombreTemp);

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