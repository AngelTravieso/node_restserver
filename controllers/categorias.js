const { response } = require("express");
const { Categoria } = require("../models");

// Crear categoria
const crearCategoria = async (req, res = response) => {

    // capitalizar nombre de categoria
    const nombre = req.body.nombre.toUpperCase();

    try {
        const categoriaDB = await Categoria.findOne({ nombre });

        // Si la categoria ya esta creada
        if (categoriaDB) {
            res.status(400).json({
                msg: `La categoria ${nombre} ya existe`,
            });
        }

        // Generar la data a guardar
        const data = {
            nombre,
            // Id del usuario en mongoDB
            usuario: req.usuario._id,
        }

        // Crear modelo con datos
        const categoria = new Categoria(data);

        // Guardar en DB
        await categoria.save();


        res.status(201).json(categoria);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'algo anda mal, hable con el administrador',
        });
    }

}

module.exports = {
    crearCategoria,
}